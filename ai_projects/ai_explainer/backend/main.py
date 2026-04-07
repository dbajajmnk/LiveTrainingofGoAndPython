from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from models.schemas import ExplainerRequest, ExplainerResponse
from services.gemini_service import gemini_service

# Initialize FastAPI app
app = FastAPI(
    title="AI Explainer API",
    description="API for explaining topics using Google Gemini API",
    version="1.0.0"
)

# CORS middleware to allow React frontend to communicate with this backend
# SOLID Principle: Open/Closed Principle (OCP) - open for extension (adding more origins)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Since it's local development, allow all. In production, restrict this.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# SOLID Principle: Dependency Inversion / SRP. The router only routes requests. 
# It depends on the gemini_service for business logic, keeping things decoupled.
@app.post("/api/explain", response_model=ExplainerResponse)
async def explain_topic(request: ExplainerRequest):
    """
    Endpoint to get an explanation for a topic.
    Flow:
    1. Validates incoming request using Pydantic (ExplainerRequest).
    2. Calls the GeminiService for the business logic.
    3. Handles standard layout response or errors gracefully.
    """
    try:
        # Business logic delegated to the service
        explanation_text = gemini_service.generate_explanation(request.topic)
        
        return ExplainerResponse(
            topic=request.topic,
            explanation=explanation_text,
            success=True
        )
    except Exception as e:
        # Log the error (omitted for KISS) and return HTTP 500
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/health")
def health_check():
    """Simple health check endpoint"""
    return {"status": "ok"}

# Entry point for direct execution
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
