# Cost Control Lab (audience demo)

Hands-on companion to **Day 30 — Cost control strategies** (`Theory.md`). Shows how **input size**, **output caps**, **caching**, and **session monitoring** affect OpenAI usage — without a database.

## Stack

- **Backend:** Python 3.10+, FastAPI, `openai`, `tiktoken`
- **Frontend:** React + Vite (JavaScript)

## Quick start

### 1. Backend (port **8011**)

```powershell
cd ai_projects\cost_control_lab\backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
copy .env.example .env
```

Add `OPENAI_API_KEY` to `.env` (same as `ai_explainer/backend/.env` is fine). Tune teaching knobs:

| Variable | Purpose |
|----------|---------|
| `PROMPT_MAX_CHARS` | Truncate user text before the model sees it |
| `MAX_OUTPUT_TOKENS` | Cap completion length |
| `CACHE_MAX_ENTRIES` | In-memory LRU size |
| `USD_PER_M_*` | **Illustrative** $/1M tokens for the dashboard only |

```powershell
uvicorn main:app --reload --port 8011
```

- Health: [http://127.0.0.1:8011/api/health](http://127.0.0.1:8011/api/health)
- Session stats (no OpenAI call): `GET /api/session/stats`

### 2. Frontend

```powershell
cd ai_projects\cost_control_lab\frontend
copy .env.example .env
npm install
npm run dev
```

Open the URL Vite prints (e.g. [http://127.0.0.1:5173](http://127.0.0.1:5173)).

## Presenter script (short)

1. **Beginner** — Run analyze on a long paste. Point at *naive vs shrunk* token counts (no API cost).
2. **Intermediate** — Run once, then repeat **the same** text with cache on → *cache hit* and no second bill.
3. **Advanced** — Same flow; watch the **session bar** and JSON totals; mention rate limit (429) if someone spams.

## API routes

| Method | Path | Role |
|--------|------|------|
| `POST` | `/api/beginner/analyze` | Token math only |
| `POST` | `/api/intermediate/ask` | Completion + optional cache |
| `POST` | `/api/advanced/monitor` | Completion + cache + session totals + rate limit |
| `GET` | `/api/session/stats` | Read counters |

Request body for ask routes: `{ "text": "...", "use_cache": true }`.

## Link to curriculum

Theory notes: `Day30/AI Governance & Adoption/Cost control strategies/Theory.md`

Related security demo: `ai_projects/secure_ai_layers/`
