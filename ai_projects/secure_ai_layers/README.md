# Secure AI Layers (teaching lab)

Small **Python + FastAPI** backend and **React + Vite** frontend that illustrate three layers:

1. **Beginner** — sanitize user input before use.
2. **Intermediate** — filter model output (compare raw vs filtered in the UI).
3. **Advanced** — optional `X-API-Key`, in-memory rate limiting, timeouts, and a single filtered JSON response.

No database. Code is heavily commented for classroom use.

## Prerequisites

- Python 3.10+
- Node.js 18+ (for the frontend)

## OpenAI key

Copy your existing `OPENAI_API_KEY` from `ai_explainer/backend/.env` (or create a new key in the OpenAI dashboard). **Never commit** `.env` or put the OpenAI key in the frontend.

```text
# secure_ai_layers/backend/.env  (create from .env.example)
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4.1-mini
# Optional: if set, the Advanced route requires matching X-API-Key from the client.
# DEMO_API_KEY=some-shared-demo-secret
```

If you set `DEMO_API_KEY`, add the same value to `frontend/.env` as `VITE_DEMO_API_KEY` so the browser sends the `X-API-Key` header.

## Run the backend

```powershell
cd ai_projects\secure_ai_layers\backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
copy .env.example .env
# Edit .env and add OPENAI_API_KEY
uvicorn main:app --reload --port 8010
```

Health check: [http://127.0.0.1:8010/api/health](http://127.0.0.1:8010/api/health)

## Run the frontend

```powershell
cd ai_projects\secure_ai_layers\frontend
copy .env.example .env
npm install
npm run dev
```

Open the URL Vite prints (usually [http://127.0.0.1:5173](http://127.0.0.1:5173)). Ensure `VITE_API_BASE_URL` matches your API (default `http://127.0.0.1:8010`).

## API summary

| Route | Purpose |
|--------|---------|
| `POST /api/beginner/sanitize` | Validate + sanitize only |
| `POST /api/intermediate/complete` | OpenAI + `raw_reply` and `filtered_reply` |
| `POST /api/advanced/secure-chat` | Filtered reply only + optional key + rate limit |

Request body for all: `{ "text": "..." }`.
