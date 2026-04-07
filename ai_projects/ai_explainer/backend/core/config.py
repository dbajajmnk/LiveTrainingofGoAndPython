from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "OpenAI Capability Explorer API"
    API_PREFIX: str = "/api"
    OPENAI_API_KEY: str = ""
    CHAT_MODEL: str = "gpt-4.1-mini"
    EMBEDDING_MODEL: str = "text-embedding-3-small"
    MODERATION_MODEL: str = "omni-moderation-latest"
    IMAGE_MODEL: str = "gpt-image-1"
    MONGO_URI: str = "mongodb://localhost:27017"
    MONGO_DB_NAME: str = "ai_explorer_db"
    JWT_SECRET_KEY: str = "change_this_secret_in_production"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 120

    model_config = SettingsConfigDict(
        case_sensitive=True,
        env_file=".env",
        extra="ignore",
    )

settings = Settings()
