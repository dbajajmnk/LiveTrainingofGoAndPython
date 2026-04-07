from pydantic import BaseModel, EmailStr, Field


class ChatRequest(BaseModel):
    prompt: str = Field(..., min_length=2)
    system_prompt: str | None = None
    model: str | None = None


class StructuredRequest(BaseModel):
    prompt: str = Field(..., min_length=2)
    model: str | None = None


class EmbeddingRequest(BaseModel):
    text: str = Field(..., min_length=1)
    model: str | None = None


class ModerationRequest(BaseModel):
    text: str = Field(..., min_length=1)
    model: str | None = None


class ImageRequest(BaseModel):
    prompt: str = Field(..., min_length=2)
    model: str | None = None
    size: str = "1024x1024"


class SignupRequest(BaseModel):
    name: str = Field(..., min_length=2)
    email: EmailStr
    password: str = Field(..., min_length=6)


class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=6)


class ForgotPasswordRequest(BaseModel):
    email: EmailStr


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserOut(BaseModel):
    id: str
    name: str
    email: EmailStr


class ForgotPasswordResponse(BaseModel):
    message: str
    reset_hint: str
