from pydantic import BaseModel, Field

# SOLID Principle: Single Responsibility Principle (SRP)
# These models are strictly for data validation and schema definition, separating them from logic.

class ExplainerRequest(BaseModel):
    """
    Request model for the AI Explainer API.
    KISS Principle: Keep the request simple, taking just the topic.
    """
    topic: str = Field(..., title="Topic", description="The topic to be explained", min_length=2)

class ExplainerResponse(BaseModel):
    """
    Response model for the AI Explainer API.
    Provides a structured, predictable format for the client.
    """
    topic: str
    explanation: str
    success: bool
    error: str | None = None
