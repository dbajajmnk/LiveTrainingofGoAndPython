"""
Application settings loaded from environment variables.

We use pydantic-settings so the same pattern works in production:
secrets stay in .env / the host environment, never in source code.
"""

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Central config for the demo API."""

    OPENAI_API_KEY: str = ""
    OPENAI_MODEL: str = "gpt-4.1-mini"
    # Optional shared secret for the Advanced demo (sent as X-API-Key from frontend).
    DEMO_API_KEY: str = ""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = Settings()
