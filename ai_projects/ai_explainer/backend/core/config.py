from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    """
    SOLID Principle: Single Responsibility Principle (SRP).
    This class is purely responsible for loading and validating application settings,
    primarily from environment variables.
    """
    PROJECT_NAME: str = "AI Explainer API"
    GEMINI_API_KEY: str

    class Config:
        case_sensitive = True
        env_file = ".env"

# Instantiate settings to be used throughout the app
settings = Settings()
