import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

class Translator:
    def __init__(self):
        self.client = None
        self.api_key = os.getenv("OPENAI_API_KEY")
        if self.api_key and self.api_key != "your_openai_api_key_here":
            self.client = OpenAI(api_key=self.api_key)

    def translate(self, text, target_lang_code):
        if not self.client or target_lang_code == 'en' and self._is_mostly_english(text):
            return text

        try:
            prompt = f"Translate the following text to {target_lang_code}. Only return the translation, no extra text.\n\nText: {text}"
            response = self.client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a professional translator for agricultural contexts."},
                    {"role": "user", "content": prompt}
                ]
            )
            return response.choices[0].message.content.strip()
        except Exception as e:
            print(f"Translation Error: {e}")
            return text

    def _is_mostly_english(self, text):
        # Very crude check
        return all(ord(c) < 128 for c in text[:20])

translator_engine = Translator()
