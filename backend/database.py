from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = "farmer_assistant"

client = None
db = None
farmers_collection = None
history_collection = None
chat_logs_collection = None

if MONGO_URI:
    try:
        client = MongoClient(
            MONGO_URI,
            tlsAllowInvalidCertificates=True,
            serverSelectionTimeoutMS=5000,
            connectTimeoutMS=5000
        )
        client.admin.command('ping')
        db = client[DB_NAME]
        farmers_collection = db["farmers"]
        history_collection = db["history"]
        chat_logs_collection = db["chat_logs"]
        print("✅ MongoDB connected")
    except Exception as e:
        print(f"⚠️ MongoDB failed: {e} — running without DB")
        client = None
        db = None
        farmers_collection = None
        history_collection = None
        chat_logs_collection = None
else:
    print("⚠️ MONGO_URI not set — running without DB")

def get_farmer_profile(farmer_id: str):
    if farmers_collection is None:
        return None
    try:
        return farmers_collection.find_one({"_id": farmer_id})
    except Exception as e:
        print(f"MongoDB Error: {e}")
        return None

def save_prediction_history(farmer_id: str, data: dict):
    if history_collection is None:
        return
    try:
        history_collection.insert_one({"farmer_id": farmer_id, "data": data})
    except Exception as e:
        print(f"MongoDB Error: {e}")

def log_chat_query(farmer_id: str, query: str, response: str, location: str = None):
    if chat_logs_collection is None:
        return
    try:
        chat_logs_collection.insert_one({
            "farmer_id": farmer_id,
            "query": query,
            "response": response,
            "location": location
        })
    except Exception as e:
        print(f"MongoDB Error: {e}")