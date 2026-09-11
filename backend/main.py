import os
# Suppress TensorFlow informational and oneDNN warnings before any TF imports happen
os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "2"

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import disease_detection, crop_prediction, weather, mandi_prices, chatbot, voice, profile, schemes
import uvicorn

app = FastAPI(title="AI Farmer Assistant API")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routes
app.include_router(disease_detection.router, prefix="/api/disease", tags=["Disease Detection"])
app.include_router(crop_prediction.router, prefix="/api/crops", tags=["Crop Prediction"])
app.include_router(weather.router, prefix="/api/weather", tags=["Weather"])
app.include_router(mandi_prices.router, prefix="/api/mandi", tags=["Mandi Prices"])
app.include_router(chatbot.router, prefix="/api/chatbot", tags=["AI Chatbot"])
app.include_router(voice.router, prefix="/api/voice", tags=["Voice Interaction"])
app.include_router(schemes.router, prefix="/api/schemes", tags=["Government Schemes"])
app.include_router(profile.router, prefix="/api/profile", tags=["Farmer Profile"])

@app.get("/")
async def root():
    return {"message": "Welcome to the AI Farmer Assistant API"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
