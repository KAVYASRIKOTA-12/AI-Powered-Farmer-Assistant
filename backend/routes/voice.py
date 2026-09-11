from fastapi import APIRouter, File, UploadFile, HTTPException
from google.cloud import speech, texttospeech
from pydantic import BaseModel
import os
import io

router = APIRouter()

# Mapping for Google Cloud speech APIs
LANG_MAP = {
    'en': 'en-US',
    'hi': 'hi-IN',
    'te': 'te-IN',
    'ta': 'ta-IN',
    'kn': 'kn-IN',
    'ml': 'ml-IN',
    'mr': 'mr-IN',
    'gu': 'gu-IN',
    'bn': 'bn-IN',
    'pa': 'pa-IN'
}

class TTSRequest(BaseModel):
    text: str
    language: str = "en"

@router.post("/stt")
async def speech_to_text(language: str = "en", file: UploadFile = File(...)):
    name = file.filename
    google_lang = LANG_MAP.get(language, "en-US")

    try:
        client = speech.SpeechClient()
        audio_content = await file.read()
        
        audio = speech.RecognitionAudio(content=audio_content)
        config = speech.RecognitionConfig(
            encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
            sample_rate_hertz=16000,
            language_code=google_lang,
        )

        response = client.recognize(config=config, audio=audio)

        transcript = ""
        for result in response.results:
            transcript += result.alternatives[0].transcript

        return {"transcript": transcript}
    except Exception as e:
        return {"transcript": f"Mock: User spoke in {language}.", "error": str(e)}

@router.post("/tts")
async def text_to_speech(request: TTSRequest):
    google_lang = LANG_MAP.get(request.language, "en-US")
    try:
        client = texttospeech.TextToSpeechClient()
        input_text = texttospeech.SynthesisInput(text=request.text)

        voice = texttospeech.VoiceSelectionParams(
            language_code=google_lang, ssml_gender=texttospeech.SsmlVoiceGender.NEUTRAL
        )

        audio_config = texttospeech.AudioConfig(
            audio_encoding=texttospeech.AudioEncoding.MP3
        )

        response = client.synthesize_speech(
            input=input_text, voice=voice, audio_config=audio_config
        )

        return {"audio_content": response.audio_content.hex()}
    except Exception as e:
        return {"error": str(e), "message": f"TTS Failed for {request.language}."}
