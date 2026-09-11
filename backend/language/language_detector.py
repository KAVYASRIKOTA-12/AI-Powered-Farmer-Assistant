from langdetect import detect, DetectorFactory
from langdetect.lang_detect_exception import LangDetectException

# For consistent results
DetectorFactory.seed = 0

class LanguageDetector:
    def __init__(self):
        # Map localized names to lang codes
        self.supported_languages = {
            'en': 'English',
            'hi': 'Hindi',
            'te': 'Telugu',
            'ta': 'Tamil',
            'kn': 'Kannada',
            'ml': 'Malayalam',
            'mr': 'Marathi',
            'gu': 'Gujarati',
            'bn': 'Bengali',
            'pa': 'Punjabi'
        }

    def detect_language(self, text):
        try:
            lang_code = detect(text)
            # Default to English if detected language not in supported list (fallback)
            return lang_code if lang_code in self.supported_languages else 'en'
        except LangDetectException:
            return 'en'

lang_detector = LanguageDetector()
