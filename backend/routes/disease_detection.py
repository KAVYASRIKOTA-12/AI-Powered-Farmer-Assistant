from fastapi import APIRouter, UploadFile, File, HTTPException
import tensorflow as tf
from PIL import Image
import numpy as np
import io
import os

router = APIRouter()

MODEL_PATH = '../saved_models/disease_model.h5'
CLASS_INDEX_PATH = '../saved_models/class_indices.txt'

# Load model lazily
model = None
class_names = None

def load_resources():
    global model, class_names
    if model is None:
        if os.path.exists(MODEL_PATH):
            model = tf.keras.models.load_model(MODEL_PATH)
        else:
            print("Warning: Disease model not found. Run training script first.")
            
    if class_names is None:
        if os.path.exists(CLASS_INDEX_PATH):
            with open(CLASS_INDEX_PATH, 'r') as f:
                indices = eval(f.read())
                class_names = {v: k for k, v in indices.items()}

@router.post("/predict")
async def predict_disease(file: UploadFile = File(...)):
    load_resources()
    if model is None:
        raise HTTPException(status_code=503, detail="Model not loaded. Please train the model first.")

    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert('RGB')
        image = image.resize((224, 224))
        img_array = np.array(image) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        predictions = model.predict(img_array)
        class_idx = np.argmax(predictions[0])
        confidence = float(predictions[0][class_idx])

        disease_name = class_names[class_idx] if class_names else f"Class {class_idx}"

        # Hardcoded recommendations for demo; in production, fetch from a DB
        recommendations = {
            "Tomato_Late_blight": "Apply fungicides like Chlorothalonil or Copper. Improve air circulation.",
            "Potato_Early_blight": "Remove infected leaves. Use balanced fertilizers. Apply Neem oil.",
            "Apple_Scab": "Prune infected branches. Apply sulfur-based sprays early in the season."
        }

        return {
            "disease": disease_name,
            "confidence": confidence,
            "recommendation": recommendations.get(disease_name, "Consult a local agricultural expert for specific treatment.")
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
