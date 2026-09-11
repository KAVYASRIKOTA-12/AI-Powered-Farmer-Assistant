from fastapi import APIRouter, HTTPException
import requests
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY", "your_api_key_here")

@router.get("/current")
async def get_weather(city: str = "Ludhiana", lat: float = None, lon: float = None):
    # If no real API key, return premium mock data
    if OPENWEATHER_API_KEY == "your_api_key_here":
        return {
            "weather": {
                "temp": 28.5,
                "humidity": 65,
                "condition": "Partly Cloudy",
                "wind_speed": 12,
                "city": city
            },
            "alerts": ["High humidity detected. Monitor tomato crops for early blight."]
        }

    if lat and lon:
        url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={OPENWEATHER_API_KEY}&units=metric"
    else:
        url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={OPENWEATHER_API_KEY}&units=metric"
    
    try:
        response = requests.get(url)
        data = response.json()
        
        if response.status_code != 200:
            return {
                "weather": {"temp": 27, "humidity": 60, "condition": "Data Unavailable", "wind_speed": 0, "city": city},
                "alerts": ["Weather API limit reached or key invalid."]
            }

        return {
            "weather": {
                "temp": data['main']['temp'],
                "humidity": data['main']['humidity'],
                "condition": data['weather'][0]['main'],
                "wind_speed": data['wind']['speed'],
                "city": data.get('name', city)
            },
            "alerts": ["No immediate extreme weather risk."]
        }
    except Exception as e:
        return {"error": str(e)}

