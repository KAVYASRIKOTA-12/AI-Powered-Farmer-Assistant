from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DB_NAME = "farmer_assistant"

client = MongoClient(MONGO_URI, tlsAllowInvalidCertificates=True, serverSelectionTimeoutMS=5000)
db = client[DB_NAME]

# Collections
farmers_collection = db["farmers"]
history_collection = db["history"]

def get_farmer_profile(farmer_id: str):
    try:
        return farmers_collection.find_one({"_id": farmer_id})
    except Exception as e:
        print(f"MongoDB Error (get_farmer_profile): {e}")
        return None

def save_prediction_history(farmer_id: str, data: dict):
    try:
        history_collection.insert_one({"farmer_id": farmer_id, "data": data})
    except Exception as e:
        print(f"MongoDB Error (save_prediction_history): {e}")

chat_logs_collection = db["chat_logs"]

def log_chat_query(farmer_id: str, query: str, response: str, location: str = None):
    try:
        chat_logs_collection.insert_one({
            "farmer_id": farmer_id,
            "query": query,
            "response": response,
            "location": location
        })
    except Exception as e:
        print(f"MongoDB Error (log_chat_query): {e}")
