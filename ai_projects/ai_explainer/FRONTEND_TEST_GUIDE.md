# Frontend Test Guide (React + Vite)

Use this guide to test the frontend step by step.

## 1) Start backend first

From `ai_projects/ai_explainer/backend`:

```powershell
venv\Scripts\python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```

Confirm backend is running:
- [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

## 2) Configure frontend API base URL

From `ai_projects/ai_explainer/frontend`:

1. Copy `.env.example` to `.env`
2. Keep default unless your backend runs on another port:

```env
VITE_API_BASE_URL=http://localhost:8000
```

---

## 3) Start frontend

From `ai_projects/ai_explainer/frontend`:

```powershell
npm install
npm run dev
```

Open the URL shown by Vite (typically [http://localhost:5173](http://localhost:5173)).

---

## 4) Verify connection banner

At top of page, check status text:
- `Backend connected (...)` -> good
- `Backend unreachable (...)` -> backend not running or wrong URL in `.env`

---

## 5) Test each tab

## Chat
1. Select `chat` tab
2. Keep default prompt or enter your own
3. Click **Run Chat**
4. Expect JSON response with `output`

## Structured
1. Select `structured` tab
2. Click **Run Structured Output**
3. Expect `output` object with:
   - `title`
   - `summary`
   - `key_points`
   - `confidence`

## Embeddings
1. Select `embeddings` tab
2. Click **Run Embeddings**
3. Expect:
   - `output.dimensions` (number)
   - `output.preview` (array of first 10 vector values)

## Moderation
1. Select `moderation` tab
2. Click **Run Moderation**
3. Expect:
   - `output.flagged`
   - `output.categories`
   - `output.category_scores`

## Image
1. Select `image` tab
2. Click **Generate Image**
3. Expect:
   - JSON response
   - Rendered image preview below response

## Models
1. Select `models` tab
2. Click **List Models**
3. Expect:
   - `models` array in JSON
   - Small text showing loaded model count

---

## 6) Troubleshooting

- `OPENAI_API_KEY is missing in backend .env`
  - Add key in `backend/.env` and restart backend

- Frontend shows `Backend unreachable`
  - Verify backend is running
  - Verify `VITE_API_BASE_URL` value
  - Restart frontend after `.env` changes

- CORS or network errors
  - Ensure backend is started from this project version
  - Check backend logs for error details
