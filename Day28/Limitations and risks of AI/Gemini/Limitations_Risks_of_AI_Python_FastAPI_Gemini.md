# 🧱 Limitations & Risks of AI (Python + FastAPI + Gemini)

---

# 1️⃣ WHAT

### ✅ Definition

Limitations and risks of AI are the **practical constraints, uncertainties, and potential negative impacts** that appear when AI systems are used in real-world applications.

---

### 🔹 One-Line Memory Hook

👉 AI is powerful, but not perfect

---

# 2️⃣ WHY

* AI is probabilistic, not deterministic
* AI can produce incorrect, unsafe, or misleading outputs
* Misuse can lead to:

  * data leaks
  * wrong decisions
  * compliance issues
  * trust loss

### Without understanding risks:

* systems become unreliable
* users lose trust
* business impact increases

---

# 3️⃣ WHEN / WHERE

### Use Awareness When:

* Building AI apps with FastAPI
* Using Gemini APIs
* Handling user data
* Deploying production AI systems

---

### Avoid Blind Usage When:

* High accuracy is required (medical, finance, legal)
* Sensitive data is involved
* No validation layer exists
* No fallback path is available

---

# 4️⃣ REAL-LIFE ANALOGY 🧠

AI is like a **smart but overconfident intern**:

* Gives answers quickly
* Sounds confident
* Can still be wrong

👉 You must review before trusting

---

# 5️⃣ CORE MIND MAP

```text id="riskmap"
User → FastAPI Input → Gemini → Output → Validation → Decision
```

---

# 6️⃣ ENGINEERING VIEW ⚙️

### Internal Breakdown

| Risk Area | Description |
| --------- | ----------- |
| Model     | hallucination / weak reasoning |
| Data      | bias / poor input quality |
| System    | latency / timeout / failures |
| Security  | prompt injection / leakage |
| Cost      | high token or usage spend |

---

### Key Terms

* Hallucination → incorrect but confident output
* Bias → unfair or skewed result
* Validation → checking output before returning it
* Sanitization → cleaning harmful or sensitive input
* Fallback → safe alternative when AI fails

---

# 7️⃣ SYSTEM DESIGN PLACEMENT 🏗️

```text id="riskdesign"
Frontend → FastAPI Backend → Gemini Service → Validation Layer → Response
```

### Explanation:

* Frontend sends user input
* FastAPI backend controls request flow
* Gemini service generates output
* Validation layer checks safety and quality
* Only then is the response returned

---

# 8️⃣ FRONTEND + BACKEND INTEGRATION 🌐

### Frontend Role

* collect input
* show result
* handle API errors

### Backend Role

* sanitize input
* call Gemini safely
* validate AI output
* control retries and cost

---

### Flow

```text id="riskflow"
UI → FastAPI → Gemini → Validation → UI
```

---

# 9️⃣ HOW (Execution Flow)

```text id="riskhow"
Input → Clean → Send to Gemini → Receive Output → Validate → Return
```

---

# 🔟 TYPES / VARIANTS

### Limitations

* Accuracy issues
* Context window limits
* Weak domain certainty
* Non-deterministic responses

### Risks

* Security risks
* Bias and unfairness
* Cost overruns
* Legal/compliance issues
* Unsafe automation

---

# 1️⃣1️⃣ SYNTAX / IMPLEMENTATION 💻

---

### Minimal Example (Risk Simulation)

```python

def ai_response():
    return "The capital of India is Mumbai"  # wrong output

print(ai_response())
```

---

### Production Example (FastAPI + Gemini Safe Wrapper)

```python
import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import google.generativeai as genai

app = FastAPI()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-1.5-flash")

class PromptRequest(BaseModel):
    prompt: str


def sanitize_input(text: str) -> str:
    blocked_words = ["password", "secret", "api key"]
    cleaned = text
    for word in blocked_words:
        cleaned = cleaned.replace(word, "[REDACTED]")
    return cleaned


def validate_output(output: str) -> str:
    if "Mumbai" in output and "capital of India" in output:
        return "⚠️ Possible incorrect answer detected. Please verify."
    return output


@app.post("/ask")
def ask_ai(data: PromptRequest):
    try:
        safe_prompt = sanitize_input(data.prompt[:500])
        result = model.generate_content(safe_prompt)
        output = result.text if hasattr(result, "text") else "No response generated"
        return {"answer": validate_output(output)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
```

---

# 1️⃣2️⃣ REAL-WORLD USE CASES 🌍

---

## ✅ Use Case 1 – Hallucination Detection

### 🎯 Why this fits

Gemini may still return a wrong answer confidently.

### 💻 Code Example

```python

def detect_wrong(output: str) -> str:
    suspicious_terms = ["always", "guaranteed", "100% correct"]
    for term in suspicious_terms:
        if term in output.lower():
            return "Flagged for review"
    return "OK"
```

### ⚙️ Engineering Note

Validation is mandatory in production.

---

## ✅ Use Case 2 – Input Sanitization (Security)

### 🎯 Why this fits

User prompts may contain secrets or unsafe payloads.

### 💻 Code Example

```python

def sanitize(text: str) -> str:
    return text.replace("password", "[REDACTED]")

print(sanitize("my password is 123"))
```

### ⚙️ Engineering Note

Sanitization reduces leakage risk.

---

## ✅ Use Case 3 – Cost Control

### 🎯 Why this fits

Long prompts and frequent AI calls increase cost.

### 💻 Code Example

```python
MAX_LENGTH = 300


def limit_prompt(prompt: str) -> str:
    return prompt[:MAX_LENGTH]
```

### ⚙️ Engineering Note

Prompt size control helps budget and latency.

---

## ✅ Use Case 4 – Bias Handling

### 🎯 Why this fits

AI may generate biased or unfair suggestions.

### 💻 Code Example

```python

def check_bias(text: str) -> str:
    flagged_patterns = ["only men", "only women", "not suitable for"]
    for item in flagged_patterns:
        if item in text.lower():
            return "⚠️ Potential bias detected"
    return "OK"
```

### ⚙️ Engineering Note

Bias detection should be part of validation or review workflows.

---

## ✅ Use Case 5 – Retry Mechanism

### 🎯 Why this fits

Gemini API calls can fail due to rate limits or transient network issues.

### 💻 Code Example

```python
import time


def retry_call(func, retries=3, delay=1):
    for attempt in range(retries):
        try:
            return func()
        except Exception:
            if attempt == retries - 1:
                return "Failed after retries"
            time.sleep(delay)
```

### ⚙️ Engineering Note

Retries improve resilience, but should be bounded.

---

# 1️⃣3️⃣ FAILURE SCENARIOS 🚨

| Issue | Reason | Fix |
| ----- | ------ | --- |
| Wrong answer | hallucination | validation layer |
| API failure | timeout / network / rate limit | retry + fallback |
| High cost | oversized prompt / too many calls | prompt limits |
| Data leak | no sanitization | input filtering |
| Bias output | model bias / bad prompt | review + checks |

---

# 1️⃣4️⃣ DEBUGGING GUIDE 🛠️

### Error Example

```text
429 Resource exhausted or rate limit exceeded
```

---

### Debug Steps

1. Check Gemini API key
2. Reduce request frequency
3. Add retry handling
4. Log input and output safely
5. Test with a minimal prompt
6. Add timeout and fallback behavior

---

# 1️⃣5️⃣ COMMON MISTAKES ❌

* trusting AI blindly
* no validation layer
* exposing sensitive data in prompts
* ignoring cost and rate limits
* no fallback path
* returning raw AI output directly to users

---

# 1️⃣6️⃣ DEEP CONCEPT 💡

👉 AI does **not** know truth

👉 It predicts likely output from patterns

👉 Confidence does **not** guarantee correctness

---

# 1️⃣7️⃣ AI / MODERN CONTEXT 🤖

Modern systems use AI for:

* assistants
* copilots
* support automation
* summarization
* content generation

Using FastAPI + Gemini:

```text id="modernrisk"
Frontend → FastAPI → Gemini → Validation → UI
```

---

# 1️⃣8️⃣ INTERVIEW QUESTIONS

---

## 🧠 MCQs (Questions Only)

1. AI limitation includes:
   A. accuracy issues
   B. CSS
   C. HTML
   D. only UI

2. Hallucination means:
   A. correct output
   B. confident wrong output
   C. database issue
   D. frontend bug

3. Risk includes:
   A. bias
   B. CSS
   C. HTML
   D. image rendering

4. Cost issue usually comes from:
   A. long prompts and repeated calls
   B. CSS
   C. HTML
   D. icons

5. Validation layer is:
   A. optional in production
   B. required for safe AI systems
   C. CSS feature
   D. DB table

6. API failure can be handled by:
   A. retry logic
   B. ignoring errors
   C. removing backend
   D. hardcoding output always

7. Bias is:
   A. fairness issue
   B. only network issue
   C. frontend styling issue
   D. cache miss

8. Secure AI systems need:
   A. sanitization
   B. bigger buttons
   C. more CSS
   D. no backend

9. AI output is:
   A. always correct
   B. probabilistic
   C. always deterministic
   D. always unsafe

10. Risk mitigation requires:
    A. validation and control layers
    B. blind trust
    C. no logging
    D. no backend

---

## ✍️ Subjective Questions (Questions Only)

1. What are the main limitations of AI?
2. Explain hallucination with an example.
3. Why is a validation layer needed in AI systems?
4. What risks exist in production AI applications?
5. How do you secure FastAPI + Gemini applications?

---

# 1️⃣9️⃣ ANSWERS SECTION

---

## 🧠 MCQ Answers

1. A
2. B
3. A
4. A
5. B
6. A
7. A
8. A
9. B
10. A

---

## ✍️ Subjective Answers

---

### 1. AI limitations

AI limitations include accuracy issues, hallucination, context limits, and non-deterministic output.

---

### 2. Hallucination

Hallucination means the model gives a confident but wrong answer.

---

### 3. Validation

Validation checks AI output before it reaches the user and improves safety and trust.

---

### 4. Risks

Major risks include security leakage, bias, cost, wrong decisions, and unreliable automation.

---

### 5. Secure apps

Secure apps sanitize input, validate output, control prompt size, handle retries, and avoid exposing secrets.

---

# 2️⃣0️⃣ PRACTICAL EXERCISES 🧪

### Beginner

* Detect suspicious AI output
* Limit prompt size

### Intermediate

* Build FastAPI validation middleware
* Add sanitization before Gemini call

### Advanced

* Build a safe AI API with retry, validation, and fallback response

---

# 2️⃣1️⃣ MINI PROJECTS 🚀

* Safe chatbot API
* AI validation gateway
* prompt cost monitor
* secure FAQ assistant

---

# 2️⃣2️⃣ INTERVIEW STORY 🎯

Built a safer AI backend using **FastAPI + Gemini** with sanitization, validation, retry handling, and prompt-size control to reduce hallucination, leakage, and production failure risk.

---

# 2️⃣3️⃣ SUMMARY

* AI is powerful but imperfect
* Validation is mandatory
* Security cannot be optional
* Cost and retries must be managed
* FastAPI should act as the control layer around Gemini
