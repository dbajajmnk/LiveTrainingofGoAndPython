# Backend API Test Guide (FastAPI Docs)

Use this guide to test backend APIs from FastAPI Swagger UI step by step.

## 1) Start backend server

From `ai_projects/ai_explainer/backend`:

```powershell
venv\Scripts\python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```

## 2) Open FastAPI docs

- Swagger UI: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- ReDoc: [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)

In Swagger:
1. Click an endpoint
2. Click **Try it out**
3. Paste sample payload (if required)
4. Click **Execute**
5. Check status code + response body

---

## 3) Step-by-step endpoint tests

## Step 1: Health check

### Endpoint
`GET /api/health`

### Expected
- Status: `200`
- Response:

```json
{
  "status": "ok"
}
```

---

## Step 2: Capability list

### Endpoint
`GET /api/capabilities`

### Expected
- Status: `200`
- Response includes capability IDs like:
  - `chat`
  - `structured`
  - `embeddings`
  - `moderation`
  - `image`
  - `models`

---

## Step 3: Chat

### Endpoint
`POST /api/chat`

### Sample payload

```json
{
  "prompt": "Explain FastAPI in 3 bullet points."
}
```

### Expected
- Status: `200`
- Response format:

```json
{
  "output": "..."
}
```

---

## Step 4: Structured output (JSON)

### Endpoint
`POST /api/structured`

### Sample payload

```json
{
  "prompt": "Create a short project brief for an AI travel assistant."
}
```

### Expected
- Status: `200`
- Response format:

```json
{
  "output": {
    "title": "...",
    "summary": "...",
    "key_points": ["...", "..."],
    "confidence": 0.0
  }
}
```

---

## Step 5: Embeddings

### Endpoint
`POST /api/embeddings`

### Sample payload

```json
{
  "text": "OpenAI embeddings convert text into vectors."
}
```

### Expected
- Status: `200`
- Response format:

```json
{
  "output": {
    "dimensions": 1536,
    "preview": [0.01, -0.02]
  }
}
```

Note: `preview` is only first 10 vector values.

---

## Step 6: Moderation

### Endpoint
`POST /api/moderation`

### Sample payload

```json
{
  "text": "This is a normal harmless sentence."
}
```

### Expected
- Status: `200`
- Response format:

```json
{
  "output": {
    "flagged": false,
    "categories": {},
    "category_scores": {}
  }
}
```

Note: category fields contain model-specific keys and scores.

---

## Step 7: Image generation

### Endpoint
`POST /api/image`

### Sample payload

```json
{
  "prompt": "A minimal modern dashboard UI in blue tones",
  "size": "1024x1024"
}
```

### Expected
- Status: `200`
- Response format:

```json
{
  "output": {
    "base64": "..."
  }
}
```

or

```json
{
  "output": {
    "url": "https://..."
  }
}
```

---

## Step 8: Model list

### Endpoint
`GET /api/models`

### Expected
- Status: `200`
- Response format:

```json
{
  "models": ["gpt-4.1-mini", "gpt-4o", "..."]
}
```

---

## 4) Optional payload with custom model

Some POST endpoints accept `model`.

Example (`POST /api/chat`):

```json
{
  "prompt": "Say hello in one line.",
  "model": "gpt-4.1-mini"
}
```

---

## 5) Common errors

- `500 OPENAI_API_KEY is missing in backend .env`
  - Add in `backend/.env`:
  ```env
  OPENAI_API_KEY=your_key_here
  ```

- `401` / auth-related errors
  - Check key validity and billing/project access.

- `429` / rate limit
  - Retry after a short wait or use a lighter model.

