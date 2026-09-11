from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from database import farmers_collection
from bson import ObjectId

router = APIRouter()

class FarmerProfile(BaseModel):
    name: str
    location: str
    land_size: float
    primary_crops: list[str]

@router.get("/{farmer_id}")
async def get_profile(farmer_id: str):
    profile = farmers_collection.find_one({"_id": farmer_id})
    if not profile:
        # For demo, return a dummy profile if not found
        return {
            "name": "Rajesh Kumar",
            "location": "Pune, Maharashtra",
            "land_size": 5.5,
            "primary_crops": ["Sugarcane", "Onion"]
        }
    profile["_id"] = str(profile["_id"])
    return profile

@router.post("/")
async def create_profile(profile: FarmerProfile):
    result = farmers_collection.insert_one(profile.dict())
    return {"id": str(result.inserted_id)}
