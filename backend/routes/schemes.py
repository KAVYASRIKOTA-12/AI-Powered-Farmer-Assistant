from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_schemes():
    return [
        { 
            "name": "PM-KISAN", 
            "description": "Income support of ₹6,000 per year in three equal installments to all landholding farmer families.", 
            "eligibility": "All landholding farmer families.", 
            "link": "https://pmkisan.gov.in/" 
        },
        { 
            "name": "Pradhan Mantri Fasal Bima Yojana (PMFBY)", 
            "description": "A yield-based insurance scheme which provides insurance cover against all non-preventable natural risks.", 
            "eligibility": "All farmers growing notified crops in notified areas.", 
            "link": "https://pmfby.gov.in/" 
        },
        { 
            "name": "Soil Health Card Scheme", 
            "description": "Provides information to farmers on nutrient status of their soil along with recommendation on appropriate dosage of nutrients.", 
            "eligibility": "Every farmer across the country.", 
            "link": "https://soilhealth.dac.gov.in/" 
        },
        { 
            "name": "Kisan Credit Card (KCC)", 
            "description": "Provides adequate and timely credit support from the banking system to the farmers for their cultivation and other needs.", 
            "eligibility": "Individual/Joint borrowers who are owner cultivators.", 
            "link": "https://www.myscheme.gov.in/schemes/kcc" 
        }
    ]
