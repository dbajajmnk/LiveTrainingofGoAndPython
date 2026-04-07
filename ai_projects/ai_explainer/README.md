# OpenAI Capability Explorer

Full-stack starter project using:
- Backend: Python + FastAPI
- Frontend: React (JavaScript) + Vite + Material UI
- AI: OpenAI API
- Database: MongoDB

## Learning modules included

- Signup / Login / Forgot Password flows
- JWT auth with protected routes
- Dashboard with authenticated data
- OpenAI capabilities lab (chat, structured output, embeddings, moderation, image, models)
- Modular frontend architecture (features/components/services)
- Backend service separation (auth + AI + security + database)

## What you can test in the UI

- Chat text generation
- Structured JSON output
- Embeddings
- Moderation
- Image generation
- Model listing

## Backend setup

1. Open terminal in `backend`
2. Create virtual environment and install dependencies:
   - `python -m venv .venv`
   - `.venv\Scripts\activate`
   - `pip install -r requirements.txt`
3. Copy `.env.example` to `.env` and set:
   - `OPENAI_API_KEY`
   - `MONGO_URI`
   - `MONGO_DB_NAME`
   - `JWT_SECRET_KEY`
4. Run backend:
   - `uvicorn main:app --reload --port 8000`

## Frontend setup

1. Open terminal in `frontend`
2. Install dependencies:
   - `npm install`
3. Copy `.env.example` to `.env` (optional if backend runs at default URL)
   - `VITE_API_BASE_URL=http://localhost:8000`
4. Run frontend:
   - `npm run dev`

The frontend expects backend at `http://localhost:8000`.
