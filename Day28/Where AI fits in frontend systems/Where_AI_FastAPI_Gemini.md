# 🧱 Where AI Fits in Frontend Systems (Python + FastAPI + Gemini)

# 1️⃣ WHAT
AI in frontend systems means UI interacts with backend AI services to provide intelligent experiences.

👉 Frontend = Display  
👉 Backend = Intelligence  

# 2️⃣ WHY
- Smart UX
- Personalization
- Automation

# 3️⃣ FLOW
User → UI → FastAPI → Gemini → Response → UI

# 4️⃣ FASTAPI + GEMINI IMPLEMENTATION

## Install
pip install fastapi uvicorn google-generativeai

## Code

from fastapi import FastAPI
from pydantic import BaseModel
import google.generativeai as genai
import os

app = FastAPI()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-pro")

class Request(BaseModel):
    prompt: str

@app.post("/ai")
def ai_response(req: Request):
    response = model.generate_content(req.prompt)
    return {"response": response.text}

# Run
# uvicorn main:app --reload

# 5️⃣ SUMMARY
Frontend = UI  
FastAPI = Backend  
Gemini = AI Engine
