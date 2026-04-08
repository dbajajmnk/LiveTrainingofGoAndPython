import google.generativeai as genai
from core.config import settings

# DRY Principle: Configure Gemini API once in this service instead of repeating it in route handlers.
# SOLID Principle: Single Responsibility Principle (SRP). 
# This class handles ONLY the interaction with the external Gemini API.

class GeminiService:
    def __init__(self):
        # Initialize the Gemini API client using the API key from config
        genai.configure(api_key=settings.GEMINI_API_KEY)
        # Use the gemini-1.5-flash model as it is fast and suitable for text generation
        # Use the gemini-2.0-flash model as it is available and fast
        self.model = genai.GenerativeModel('gemini-2.0-flash')

    def generate_explanation(self, topic: str) -> str:
        """
        Generates a simple, easy-to-understand explanation for a given topic.
        """
        # KISS Principle: Keep the prompt straightforward.
        prompt = f"Explain the concept of '{topic}' in simple terms as if to a beginner. Please be clear, engaging, and provide an analogy if possible. Format visually nicely using bullet points if needed."
        
        try:
            response = self.model.generate_content(prompt)
            # Extracted text from the model response
            return response.text
        except Exception as e:
            # Re-raise the exception to be handled by the router
            raise Exception(f"Failed to generate explanation from Gemini API: {str(e)}")

# Create a singleton instance to be used by the dependency injection in FastAPI
gemini_service = GeminiService()
