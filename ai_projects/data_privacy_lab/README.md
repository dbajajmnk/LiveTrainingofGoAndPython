# Data Privacy Lab (student demo)

Runnable companion to **Day 30 — Data privacy considerations** (`Theory.md`). Demonstrates **masking**, **prompt sanitization**, **safe logging**, **minimal storage**, and **30-day retention** — **no external database** (in-memory only).

## Stack

- Python 3.10+, FastAPI, OpenAI Python SDK  
- React + Vite (JavaScript)

## Run

### Backend (port **8012**)

```powershell
cd ai_projects\data_privacy_lab\backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
copy .env.example .env
```

Add `OPENAI_API_KEY` (same as `ai_explainer/backend/.env` is fine).

```powershell
uvicorn main:app --reload --port 8012
```

### Frontend

```powershell
cd ai_projects\data_privacy_lab\frontend
copy .env.example .env
npm install
npm run dev
```

## Presenter flow

1. **Beginner** — Show email/phone masking with **no API cost**.
2. **Intermediate** — Same sample text; show **input rules** + **sanitized prompt** + model reply + **output rules**.
3. **Advanced** — Explain **masked log line** and **stored minimal record**; click **Inject stale record**, then **Run demo** and point at **`records_purged_this_request`**.

## API

| Method | Path | Purpose |
|--------|------|---------|
| `POST` | `/api/beginner/mask` | Email + phone masks only |
| `POST` | `/api/intermediate/ask` | Full redaction + OpenAI |
| `POST` | `/api/advanced/privacy-flow` | Logs + store + retention + OpenAI |
| `POST` | `/api/advanced/inject-stale-record` | Demo row older than 30 days |
| `GET` | `/api/advanced/store-stats` | Active record count |

## Related projects

- `ai_projects/cost_control_lab/` — token / cache teaching  
- `ai_projects/secure_ai_layers/` — security layers teaching  
