from fastapi import APIRouter, HTTPException
import requests
import os

router = APIRouter()

# Data.gov.in API Key (Example Gov API)
GOV_API_KEY = os.getenv("GOV_API_KEY", "your_api_key_here")

@router.get("/")
@router.get("/prices")
async def get_mandi_prices(state: str = None, district: str = None, crop: str = None):
    # Base URL for Mandi prices (Example)
    # https://api.data.gov.in/resource/9ef27131-ece2-4949-abc2-17164450a30c?api-key=YOUR_KEY&format=json
    
    # For demo purposes, we return sample data if no API key is set
    if GOV_API_KEY == "your_api_key_here":
        return [
            {"state": "Maharashtra", "district": "Nashik", "market": "Lasalgaon", "commodity": "Onion", "min_price": 1200, "max_price": 1800, "mandi_price": 1500},
            {"state": "Punjab", "district": "Amritsar", "market": "Amritsar", "commodity": "Wheat", "min_price": 2015, "max_price": 2100, "mandi_price": 2050}
        ]

    url = f"https://api.data.gov.in/resource/9ef27131-ece2-4949-abc2-17164450a30c?api-key={GOV_API_KEY}&format=json"
    
    # In a real scenario, add filters to the URL
    try:
        response = requests.get(url)
        data = response.json()
        return data.get("records", [])
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/schemes")
async def get_schemes():
    return [
        {
            "name": "PM Fasal Bima Yojana",
            "description": "Financial support for farmers facing crop loss due to natural calamities.",
            "eligibility": "All farmers including sharecroppers and tenant farmers.",
            "link": "https://pmfby.gov.in/"
        },
        {
            "name": "PM Kisan Samman Nidhi",
            "description": "Annual direct income support of ₹6,000 to all landholding farmer families.",
            "eligibility": "Small and marginal farmers.",
            "link": "https://pmkisan.gov.in/"
        },
        {
            "name": "Soil Health Card Scheme",
            "description": "Assessment of soil health and nutrient status to improve productivity.",
            "eligibility": "Every farmer in the country.",
            "link": "https://soilhealth.dac.gov.in/"
        }
    ]
