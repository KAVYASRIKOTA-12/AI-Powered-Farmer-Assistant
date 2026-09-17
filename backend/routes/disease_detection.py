from fastapi import APIRouter, UploadFile, File, HTTPException
import os

router = APIRouter()


@router.post("/predict")
async def predict_disease(file: UploadFile = File(...)):
    # MOCK RESPONSE — real model will be integrated later
    return {
        "disease": "Tomato Late Blight (Demo)",
        "confidence": 0.94,
        "recommendation": "Apply Mancozeb or Copper oxychloride fungicides. Ensure proper spacing for airflow. (Demo response — real model will be integrated soon.)"
    }