"""Load settings from environment (.env supported via pydantic-settings)."""

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    OPENAI_API_KEY: str = ""
    OPENAI_MODEL: str = "gpt-4.1-mini"

    # How much user text we send to the model after trimming (input cost control).
    PROMPT_MAX_CHARS: int = 600
    # Hard cap on completion length (output cost control).
    MAX_OUTPUT_TOKENS: int = 220

    CACHE_MAX_ENTRIES: int = 64

    # Illustrative pricing for the dashboard — not a bill from OpenAI.
    USD_PER_M_INPUT_TOKENS: float = 0.15
    USD_PER_M_OUTPUT_TOKENS: float = 0.60

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = Settings()
