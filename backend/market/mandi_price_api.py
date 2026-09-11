import requests
import os
from dotenv import load_dotenv

load_dotenv()

# Real-time data from Data.gov.in (Agmarknet API)
# API URL: https://api.data.gov.in/resource/9ef27131-8799-4a14-b772-019e09d8c697
API_KEY = os.getenv("DATA_GOV_API_KEY", "your_api_key_here")
RESOURCE_ID = "9ef27131-8799-4a14-b772-019e09d8c697"

class MandiPriceAPI:
    def __init__(self):
        self.base_url = "https://api.data.gov.in/resource/" + RESOURCE_ID
        self.api_key = API_KEY

    def get_latest_prices(self, commodity=None, state=None, limit=20):
        if self.api_key == "your_api_key_here":
            return self._get_mock_data(commodity, state)

        params = {
            "api-key": self.api_key,
            "format": "json",
            "limit": limit
        }

        # Filter construction: "filters[commodity]=Wheat&filters[state]=Punjab"
        if commodity:
            params["filters[commodity]"] = commodity.capitalize()
        if state:
            params["filters[state]"] = state.capitalize()

        try:
            response = requests.get(self.base_url, params=params)
            data = response.json()
            if "records" in data:
                return data["records"]
            return []
        except Exception as e:
            print(f"API Error: {e}")
            return self._get_mock_data(commodity, state)

    def _get_mock_data(self, commodity, state):
        """High-quality fallback for demonstration and development"""
        mock_data = [
            {"state": "Punjab", "district": "Ludhiana", "market": "Ludhiana", "commodity": "Wheat", "min_price": "2125", "max_price": "2350", "modal_price": "2275", "arrival_date": "11/03/2026"},
            {"state": "Haryana", "district": "Karnal", "market": "Karnal", "commodity": "Wheat", "min_price": "2150", "max_price": "2400", "modal_price": "2300", "arrival_date": "11/03/2026"},
            {"state": "Uttar Pradesh", "district": "Bareilly", "market": "Bareilly", "commodity": "Wheat", "min_price": "2050", "max_price": "2250", "modal_price": "2175", "arrival_date": "10/03/2026"},
            {"state": "Telangana", "district": "Warangal", "market": "Warangal", "commodity": "Maize", "min_price": "1850", "max_price": "2100", "modal_price": "2000", "arrival_date": "11/03/2026"},
            {"state": "Andhra Pradesh", "district": "Guntur", "market": "Guntur", "commodity": "Cotton", "min_price": "6500", "max_price": "7800", "modal_price": "7200", "arrival_date": "11/03/2026"},
            {"state": "Maharashtra", "district": "Nagpur", "market": "Nagpur", "commodity": "Soybean", "min_price": "4200", "max_price": "4850", "modal_price": "4600", "arrival_date": "10/03/2026"}
        ]
        
        filtered = mock_data
        if state:
            filtered = [r for r in filtered if r["state"].lower() == state.lower()]
        if commodity:
            filtered = [r for r in filtered if r["commodity"].lower() == commodity.lower()]
        
        return filtered

mandi_api = MandiPriceAPI()
