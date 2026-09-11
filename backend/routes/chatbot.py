from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from market.price_analyzer import price_analyzer
from database import get_farmer_profile, log_chat_query
from openai import OpenAI
import os

router = APIRouter()

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class ChatQuery(BaseModel):
    message: str
    language: str = "en"
    farmer_id: str = None
    location: str = None

# Intent mapping for Tool Routing
INTENT_TOOLS = {
    "weather": "weather_module",
    "price": "mandi_prices",
    "disease": "disease_detection",
    "scheme": "government_schemes",
    "recommend": "crop_recommendation"
}

def get_openai_response(query: str, location: str) -> str:
    system_prompt = (
        "You are AgriAI Expert, a helpful and knowledgeable agricultural assistant. "
        "Your goal is to provide accurate, easy-to-understand, and practical advice to farmers. "
        "Do not use external vector databases or RAG. Rely on your internal knowledge about crops, "
        "soil, weather impacts, and farming best practices."
    )
    if location:
        system_prompt += f" The farmer is located in {location}. Please tailor your advice to this region if applicable."
    
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": query}
        ],
        max_tokens=250,
        temperature=0.7
    )
    return response.choices[0].message.content.strip()

@router.post("/ask")
async def ask_chatbot(query: ChatQuery):
    msg = query.message.lower()
    
    # 1. Detect language
    from language.language_detector import lang_detector
    from language.translator import translator_engine
    
    # Use explicitly requested language if provided, otherwise detect
    user_lang = query.language if query.language in lang_detector.supported_languages else lang_detector.detect_language(msg)
    
    # Tool Routing - Detect if user wants a specific feature
    # Note: Intent detection works better if translated to English first if not already
    english_msg = msg
    if user_lang != 'en':
        english_msg = translator_engine.translate(msg, 'en').lower()

    tool_redirect = None
    for intent, tool in INTENT_TOOLS.items():
        if intent in english_msg:
            tool_redirect = tool
            break

    # If it's a specific tool request
    if tool_redirect:
        raw_response = ""
        action = "navigate"
        target = ""

        if tool_redirect == "weather_module":
            raw_response = "I can help you with the weather! Opening the weather dashboard now..."
            target = "weather"
        elif tool_redirect == "disease_detection":
            raw_response = "Please upload a photo of the plant leaf, and I will analyze it for diseases."
            target = "disease"
        elif tool_redirect == "mandi_prices":
            # Extra skill: Extract commodity and state from the query
            from language.translator import translator_engine
            english_msg = translator_engine.translate(msg, 'en').lower()
            
            # Simple extractor for commodity name
            commodities = ['wheat', 'rice', 'paddy', 'maize', 'cotton', 'soybean', 'mustard', 'gram', 'tomato', 'potato', 'onion']
            states = ['punjab', 'haryana', 'uttar pradesh', 'telangana', 'andhra pradesh', 'maharashtra', 'gujarat', 'rajasthan', 'bihar', 'west bengal']
            
            found_commodity = next((c for c in commodities if c in english_msg), None)
            found_state = next((s for s in states if s in english_msg), None)
            
            if found_commodity:
                raw_response = price_analyzer.get_summary(found_commodity, found_state)
                action = "chat"
            else:
                raw_response = "Looking for market prices? You can check them in the Mandi Prices section or tell me which crop you want to check."
                target = "prices"
                action = "navigate"

        if raw_response:
            final_response = raw_response
            if user_lang != 'en':
                final_response = translator_engine.translate(raw_response, user_lang)
            
            # Log the query to MongoDB
            log_chat_query(query.farmer_id, query.message, final_response, query.location)
            
            return {"response": final_response, "action": action, "target": target}

    # Default: Use direct OpenAI for general farming advice. Check for user location
    user_location = query.location
    if not user_location and query.farmer_id:
        profile = get_farmer_profile(query.farmer_id)
        if profile and 'location' in profile:
            user_location = profile['location']

    try:
        raw_ai_response = get_openai_response(english_msg, user_location)
        final_response = raw_ai_response
        if user_lang != 'en':
            final_response = translator_engine.translate(raw_ai_response, user_lang)
            
    except Exception as e:
        final_response = "I am currently experiencing some issues connecting to my knowledge base. Please try again later."
        print(f"OpenAI API Error: {e}")

    # Log the query to MongoDB
    log_chat_query(query.farmer_id, query.message, final_response, user_location)

    return {"response": final_response, "action": "chat"}
