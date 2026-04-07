from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
import uvicorn

from core.database import get_users_collection
from models.schemas import (
    ChatRequest,
    EmbeddingRequest,
    ForgotPasswordRequest,
    ForgotPasswordResponse,
    ImageRequest,
    LoginRequest,
    ModerationRequest,
    SignupRequest,
    StructuredRequest,
    TokenResponse,
    UserOut,
)
from services.auth_service import auth_service
from services.openai_service import openai_service

app = FastAPI(
    title="OpenAI Capability Explorer API",
    description="FastAPI backend to test OpenAI capabilities from a React frontend.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

auth_scheme = HTTPBearer()


async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(auth_scheme)):
    token = credentials.credentials
    return await auth_service.get_user_by_token(token)


@app.on_event("startup")
async def startup_db_indexes():
    users = get_users_collection()
    await users.create_index("email", unique=True)


@app.post("/api/auth/signup", response_model=TokenResponse)
async def signup(request: SignupRequest):
    try:
        token = await auth_service.create_user(request.name, request.email, request.password)
        return {"access_token": token, "token_type": "bearer"}
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))


@app.post("/api/auth/login", response_model=TokenResponse)
async def login(request: LoginRequest):
    try:
        token = await auth_service.login_user(request.email, request.password)
        return {"access_token": token, "token_type": "bearer"}
    except ValueError as exc:
        raise HTTPException(status_code=401, detail=str(exc))


@app.post("/api/auth/forgot-password", response_model=ForgotPasswordResponse)
async def forgot_password(request: ForgotPasswordRequest):
    data = await auth_service.forgot_password(request.email)
    return data


@app.get("/api/auth/me", response_model=UserOut)
async def me(current_user=Depends(get_current_user)):
    return current_user


@app.get("/api/dashboard")
async def dashboard(current_user=Depends(get_current_user)):
    return {
        "welcome": f"Welcome, {current_user['name']}",
        "tips": [
            "Try chat capability with custom system prompts.",
            "Use embeddings to power semantic search projects.",
            "Use moderation before saving user-generated text.",
        ],
        "stats": {
            "capabilities_available": 6,
            "project_tracks": ["Auth", "OpenAI", "MongoDB", "FastAPI", "React + MUI"],
        },
    }


@app.get("/api/capabilities")
def get_capabilities():
    return {"capabilities": openai_service.list_capabilities()}


@app.post("/api/chat")
def chat(request: ChatRequest):
    try:
        output = openai_service.chat(
            prompt=request.prompt,
            model=request.model,
            system_prompt=request.system_prompt,
        )
        return {"output": output}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/structured")
def structured_output(request: StructuredRequest):
    try:
        output = openai_service.structured_output(
            prompt=request.prompt,
            model=request.model,
        )
        return {"output": output}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/embeddings")
def embeddings(request: EmbeddingRequest):
    try:
        output = openai_service.embedding(
            text=request.text,
            model=request.model,
        )
        return {"output": output}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/moderation")
def moderation(request: ModerationRequest):
    try:
        output = openai_service.moderation(
            text=request.text,
            model=request.model,
        )
        return {"output": output}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/image")
def image(request: ImageRequest):
    try:
        output = openai_service.image(
            prompt=request.prompt,
            model=request.model,
            size=request.size,
        )
        return {"output": output}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/models")
def list_models():
    try:
        return {"models": openai_service.models()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/health")
def health_check():
    return {"status": "ok"}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
