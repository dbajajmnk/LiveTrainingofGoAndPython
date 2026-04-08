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

## Open AI Mastery learning flow (implemented)

The app now includes a structured learning path with:
- Course list
- Module list by course
- Module detail with topic cards
- Topic detail with section-based content
- MCQ assessment per topic
- Subjective section locked until MCQ pass
- MongoDB progress persistence (backend-enforced unlock rules)

## Environment examples

### Backend `.env`

```env
OPENAI_API_KEY=your_openai_api_key_here
CHAT_MODEL=gpt-4.1-mini
EMBEDDING_MODEL=text-embedding-3-small
MODERATION_MODEL=omni-moderation-latest
IMAGE_MODEL=gpt-image-1
MONGO_URI=mongodb://localhost:27017
MONGO_DB_NAME=ai_explorer_db
JWT_SECRET_KEY=change_this_secret_in_production
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=120
```

### Frontend `.env`

```env
VITE_API_BASE_URL=http://localhost:8000
VITE_APP_NAME=Open AI Mastery
```

## Run instructions

### 1) Run backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### 2) Run frontend

```bash
cd frontend
npm install
npm run dev
```

## Seed instructions (Open AI Mastery data)

This inserts:
- 1 course (`Open AI Mastery`)
- 14 modules
- 10 topics for module 1
- full topic content for topic 1
- 3 MCQs and 3 subjective questions for topic 1

Run:

```bash
cd backend
python -m seeds.seed_runner
```

Seed files:
- `backend/seeds/seed_open_ai_mastery.py`
- `backend/seeds/seed_runner.py`

## Quick manual testing checklist

1. Signup/Login works and user reaches dashboard.
2. Open `Learning` from the top navigation.
3. Course list loads and shows `Open AI Mastery`.
4. Open course -> modules list loads.
5. Open module 1 -> topics load.
6. Open topic 1:
   - Topic sections render (high-level, deep, walkthrough, demo, manual, practice, takeaways).
   - Topic viewed call happens automatically.
7. MCQ section is available after topic viewed; submit answers:
   - If score is not passing, subjective remains locked.
   - If score is passing, subjective unlocks.
8. Submit subjective answers successfully.
9. Refresh topic page and verify unlock state still matches backend progress.
10. (Optional API check) Verify progress endpoint:
   - `GET /api/users/me/progress/{course_id}`

## Assumptions and placeholder areas

- Auth middleware is assumed to exist; frontend uses Bearer token from existing auth flow.
- Current user is resolved via existing `get_current_user` dependency.
- No admin CMS UI yet; seed data is used for initial content.
- Course/module/topic authoring/editing flows are out of scope for this phase.
- Learning API contracts are currently consumed as-is; no frontend response adapters were added.
