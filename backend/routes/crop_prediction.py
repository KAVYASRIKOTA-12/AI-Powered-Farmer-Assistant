from fastapi import APIRouter, HTTPException
import pickle
import numpy as np
import os
from pydantic import BaseModel

router = APIRouter()

# Paths
RECOMMENDATION_MODEL_PATH = '../saved_models/crop_recommendation_model.pkl'
PRICE_MODEL_PATH = '../saved_models/price_model.pkl'

class RecommendationInput(BaseModel):
    N: float
    P: float
    K: float
    temperature: float
    humidity: float
    ph: float
    rainfall: float

class PriceInput(BaseModel):
    state: str
    district: str
    crop: str
    month: int
    year: int

@router.post("/recommend")
async def recommend_crop(data: RecommendationInput):
    if not os.path.exists(RECOMMENDATION_MODEL_PATH):
        raise HTTPException(status_code=503, detail="Recommendation model not found.")

    with open(RECOMMENDATION_MODEL_PATH, 'rb') as f:
        model = pickle.load(f)

    input_data = np.array([[data.N, data.P, data.K, data.temperature, data.humidity, data.ph, data.rainfall]])
    prediction = model.predict(input_data)
    
    return {"recommended_crop": prediction[0]}

@router.post("/predict-price")
async def predict_price(data: PriceInput):
    if not os.path.exists(PRICE_MODEL_PATH):
        raise HTTPException(status_code=503, detail="Price prediction model not found.")

    with open(PRICE_MODEL_PATH, 'rb') as f:
        model = pickle.load(f)

    # Note: In a real app, 'state', 'district', and 'crop' would be label-encoded 
    # to match the codes used during training. Here we use dummy encoding for demo.
    # In production, use a shared LabelEncoder or look-up table.
    
    # Dummy encoding (replace with real mapping)
    dummy_state = 1
    dummy_district = 1
    dummy_crop = 1

    input_data = np.array([[dummy_state, dummy_district, dummy_crop, data.month, data.year]])
    prediction = model.predict(input_data)

    return {"predicted_price": round(float(prediction[0]), 2), "unit": "INR/Quintal"}
