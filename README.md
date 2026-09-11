# 🌾 AgriAI Expert - Premium AI Farmer Assistant

AgriAI Expert is a comprehensive, state-of-the-art agricultural platform designed to empower farmers with AI-driven insights. It features a responsive React dashboard, a scalable FastAPI backend, and modular AI tools for crop health, pricing predictions, and intelligent OpenAI-powered farming assistance.

---

## ✨ Key Features

- **🌐 Multilingual Support**: Chatbot and Voice interactions available in 10+ Indian languages (Hindi, Telugu, Tamil, Kannada, Bengali, etc.), employing automatic language detection and translation via OpenAI.
- **🤖 Intelligent Chatbot**: Provides context-aware farming advice utilizing direct integrations with the generative semantic capabilities of the OpenAI API.
- **💻 Web Interface**: 
  - **React Dashboard**: Fast, premium, and interactive web application powered by Vite.
- **🩺 Disease Detection**: CNN-based computer vision analysis of crop leaf images to identify diseases and recommend specific agrochemical treatments.
- **📈 Real-Time Market (Mandi) Prices**: Intelligent scraping and tracking of agricultural market rates with graceful mock-data fallbacks if Government APIs are down.
- **🌱 Crop Recommendation Engine**: Suggests optimal crops based on N/P/K soil values, temperature, humidity, pH, and rainfall utilizing Scikit-learn models.
- **🌦️ Weather Alerts**: Hyper-local, farming-specific weather forecasts and warnings.
- **🎙️ Voice Interface**: Speech-to-Text and Text-to-Speech endpoints supporting regional farmer accessibility through Google Cloud NLP.

---

## 📁 System Architecture & Directory Structure

```text
Ai Powered Farmer Assistant/
├── backend/                   # Scalable REST API
│   ├── main.py                # FastAPI ASGI server entry point
│   ├── database.py            # MongoDB connection handlers
│   ├── routes/                # Modular API endpoints (Disease, Crops, Weather, etc.)
│   ├── market/                # Market pricing scrapers & logic
│   └── language/              # OpenAI-based language detection & translation engine
├── frontend/
│   └── react_dashboard/       # Vite-powered React Web app
├── ai_models/                 # Python scripts to train CNN & ML models (Scikit-learn, TF)
├── datasets/                  # Datasets & source data for model training
├── saved_models/              # Pre-trained compiled models (.h5, .pkl, text indices)
└── .env                       # Global Environment configuration variables
```

---

## ⚙️ Setup & Configuration

### 1. Prerequisites
Ensure you have the following installed on your machine:
- **Python 3.9+**
- **Node.js (v18+)** & npm
- **MongoDB Database** (Atlas URI or Local setup)

### 2. Environment Variables Configuration
For security, API keys and sensitive credentials must be set in your `.env` files.

**Global / Backend (`.env` located in project root):**
```env
# Essential Setup
MONGO_URI=mongodb+srv://<your_db_username>:<password>@cluster/
OPENAI_API_KEY=sk-proj-...
OPENWEATHER_API_KEY=your_key_here

# Optional Configurations (Will gracefully fallback to test outputs if omitted)
GOOGLE_APPLICATION_CREDENTIALS=path/to/your/credentials.json
DATA_GOV_API_KEY=your_api_key_here
```

**Frontend Dashboard (`frontend/react_dashboard/.env`):**
```env
VITE_API_URL=http://localhost:8000/api
```

### 3. Pre-trained ML Models Note
This project automatically utilizes pre-configured models housed in the `/saved_models` directory relative to the backend paths. If you wish to retrain them on new data:
1. Ensure target data is downloaded according to `datasets/README.md`.
2. Execute the training pipelines from the root directory:
   ```bash
   python ai_models/train_disease_model.py
   python ai_models/train_crop_recommendation_model.py
   python ai_models/train_price_model.py
   ```

---

## 🚀 Execution Guide

You will need two separate terminal windows to run both the frontend and backend concurrently.

### 🔌 1. Running the Backend (FastAPI)
```bash
# Navigate to the backend directory
cd backend

# Install Python Dependencies
pip install -r requirements.txt

# Start the Server
python main.py
```
> **Note:** The backend API activates at `http://localhost:8000`.
> Full interactive **Swagger UI Documentation** becomes available at `http://localhost:8000/docs`.

### 💻 2. Running the Web Dashboard (React)
Open a new terminal session and run:
```bash
# Navigate to the frontend directory
cd frontend/react_dashboard

# Install Node Dependencies
npm install

# Start Vite Development Server
npm run dev
```
> **Note:** The frontend dashboard connects dynamically and operates at `http://localhost:5173`.

---

## 🛠️ Key API Modules Reference

The backend exposes several modular REST routes tailored for the UI:
- `POST /api/disease/predict`: Accepts leaf image uploads and returns identified disease classes & chemical remedies.
- `POST /api/crops/recommend`: Predicts the best crop given exact soil composition JSON.
- `GET/POST /api/mandi/prices`: Retrieves state/district-level agricultural crop valuations.
- `POST /api/chatbot/ask`: Interfaces with the OpenAI-powered intelligent farming assistant.
- `POST /api/voice/stt` and `/api/voice/tts`: Handles native audio transcriptions across supported Indian dialects.

---
*Built with ❤️ for global agriculture improvement leveraging Artificial Intelligence.*
"# AI-Powered-Farmer-Assistant-" 
