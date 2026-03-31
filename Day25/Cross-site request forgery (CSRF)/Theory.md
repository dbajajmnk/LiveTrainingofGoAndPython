# Cross-Site Request Forgery (CSRF)

---

# 1) What

CSRF (Cross-Site Request Forgery) is a security attack where a malicious website tricks a user’s browser into sending **unauthorized requests** to another website where the user is already authenticated.

---

# 2) Why

Browsers automatically include credentials (cookies, session tokens) with requests.

Because of this:

* the server thinks the request is from a trusted user
* but the user never intended to perform that action

---

### Problem it creates

* unauthorized payments
* account changes
* data modification
* security breaches

---

# 3) When

CSRF happens when:

* user is logged into a website
* attacker triggers a request from another site
* browser automatically sends cookies
* server does not verify request origin

---

# 4) How

## Step-by-step attack flow

1. User logs into bank website
2. Session cookie is stored in browser
3. User visits malicious site
4. Malicious site sends request:

```html
<img src="https://bank.com/transfer?amount=10000&to=attacker">
```

5. Browser automatically sends cookies
6. Server processes request as valid

👉 Attack successful

---

# 5) Real-Life Analogy

Imagine:

* You are logged into your bank
* Someone tricks you into signing a blank cheque
* Bank processes it because your signature is valid

👉 You didn’t intend it, but it still happened

---

# 6) Engineering View

## Root cause

👉 Browser automatically attaches credentials
👉 Server trusts request without verification

---

## Vulnerable pattern

```text
User Authenticated → Request Sent → Server trusts request blindly
```

---

## Missing validation

* no CSRF token
* no origin check
* no referrer validation

---

# 7) Types of CSRF

## 1. GET-based CSRF

```html
<img src="https://bank.com/delete-account">
```

---

## 2. POST-based CSRF

```html
<form action="https://bank.com/transfer" method="POST">
  <input type="hidden" name="amount" value="10000">
  <input type="hidden" name="to" value="attacker">
</form>

<script>
  document.forms[0].submit();
</script>
```

---

## 3. AJAX CSRF (Modern apps)

Using JavaScript to trigger API calls silently.

---

# 8) Why CSRF Works

Because:

* cookies are sent automatically
* server trusts cookies
* no request validation

---

# 9) Key Difference from XSS

| Feature                | CSRF             | XSS               |
| ---------------------- | ---------------- | ----------------- |
| Attack type            | request forgery  | script injection  |
| Needs user interaction | yes (visit page) | not always        |
| Executes code?         | no               | yes               |
| Target                 | server trust     | browser execution |

---

# 10) Real-World Use Cases

---

## 1. Bank Transfer

User visits malicious page → money transferred

---

## 2. Password Change

Hidden request updates password

---

## 3. Email Change

Account email changed silently

---

## 4. Social Media

User unknowingly likes/posts something

---

## 5. Admin Panel

Admin performs unintended actions

---

# 11) Prevention Techniques

---

## 1. CSRF Token (MOST IMPORTANT)

### Idea

Server generates unique token per session

```html
<input type="hidden" name="csrf_token" value="abc123">
```

Server validates token before processing request.

---

## 2. SameSite Cookies

```http
Set-Cookie: session=abc; SameSite=Strict
```

Prevents cookies from being sent in cross-site requests.

---

## 3. Check Origin / Referer

Validate request source:

```text
Origin: https://your-site.com
```

---

## 4. Use POST instead of GET for sensitive actions

GET should NOT modify data.

---

## 5. Custom Headers (for APIs)

Example:

```javascript
fetch("/api/transfer", {
  headers: {
    "X-CSRF-Token": "abc123"
  }
});
```

---

## 6. Double Submit Cookie

Send token in both:

* cookie
* request body

Validate both match.

---

# 12) Safe vs Unsafe Example

---

### ❌ Unsafe

```javascript
fetch("/transfer?amount=10000");
```

---

### ✅ Safe

```javascript
fetch("/transfer", {
  method: "POST",
  headers: {
    "X-CSRF-Token": token
  }
});
```

---

# 13) Common Mistakes

* not using CSRF tokens
* allowing state change via GET
* trusting cookies blindly
* not validating origin
* ignoring SameSite cookies

---

# 14) Deep Concept

👉 Authentication ≠ Authorization of intent

Just because a request has valid cookies
does NOT mean the user intended it.

---

# 15) Interview-Friendly Definition

CSRF is an attack where a malicious website tricks a user’s browser into making unauthorized requests to another site where the user is authenticated, exploiting the browser’s automatic credential handling.

---

# 16) 20 MCQ Questions

---

## Questions

1. CSRF stands for:
   A. Cross Server Request
   B. Cross Site Request Forgery
   C. Client Server Request
   D. Cross Script Request

2. CSRF exploits:
   A. cookies
   B. CSS
   C. DOM
   D. HTML

3. CSRF works because browser:
   A. blocks cookies
   B. auto-sends cookies
   C. ignores cookies
   D. deletes cookies

4. CSRF attack targets:
   A. frontend
   B. server trust
   C. database
   D. CDN

5. CSRF requires user to:
   A. login
   B. logout
   C. delete cookies
   D. disable JS

6. Safe method for sensitive action:
   A. GET
   B. POST
   C. HEAD
   D. OPTIONS

7. Best prevention:
   A. cache
   B. CSRF token
   C. CSS
   D. CDN

8. SameSite cookie helps:
   A. styling
   B. prevent cross-site request
   C. routing
   D. caching

9. CSRF does NOT need:
   A. user session
   B. malicious site
   C. script execution
   D. cookies

10. CSRF vs XSS difference:
    A. same
    B. CSRF no script injection
    C. both inject scripts
    D. none

11. CSRF token should be:
    A. constant
    B. unique
    C. public
    D. optional

12. GET request should:
    A. modify data
    B. be safe
    C. delete data
    D. update DB

13. Origin header helps:
    A. styling
    B. validation
    C. rendering
    D. caching

14. Attack type:
    A. injection
    B. forgery
    C. caching
    D. rendering

15. Hidden form attack uses:
    A. CSS
    B. HTML
    C. JSON
    D. SQL

16. Double submit cookie:
    A. ignore cookie
    B. compare tokens
    C. delete cookie
    D. encrypt cookie

17. CSRF risk exists when:
    A. no auth
    B. auth exists
    C. no JS
    D. no DOM

18. Which prevents CSRF:
    A. eval
    B. CSP
    C. CSRF token
    D. innerHTML

19. Browser behavior exploited:
    A. parsing
    B. auto credentials
    C. rendering
    D. caching

20. Best summary:
    A. request forgery attack
    B. script injection
    C. memory leak
    D. layout shift

---

## Answers

1. B
2. A
3. B
4. B
5. A
6. B
7. B
8. B
9. C
10. B
11. B
12. B
13. B
14. B
15. B
16. B
17. B
18. C
19. B
20. A

---

# 17) Subjective Questions

1. What is CSRF?
2. Why does CSRF happen?
3. How does CSRF attack work step-by-step?
4. Difference between CSRF and XSS
5. What is CSRF token?
6. Why SameSite cookies are important?
7. Why GET should not modify data?
8. What is double submit cookie?
9. How to prevent CSRF in APIs?
10. Real-world CSRF examples

---

# 18) Practical Exercises

---

## Practice 1 — Unsafe request

```javascript
fetch("/delete-account");
```

---

## Practice 2 — Add CSRF protection

```javascript
fetch("/delete-account", {
  method: "POST",
  headers: {
    "X-CSRF-Token": token
  }
});
```

---

## Practice 3 — Analyze vulnerability

Find issues in:

```html
<form action="/transfer" method="GET">
  <input name="amount" value="10000">
</form>
```

---

# 19) Mini Projects

* secure payment system
* CSRF-protected login system
* API with token validation
* SameSite cookie implementation
* admin panel security

---

# 20) Final Summary

## Core Idea

👉 CSRF = request sent without user intent

---

## Key Points

* browser auto-sends cookies
* server trusts request
* attacker exploits this

---

## Golden Rule

👉 Always verify **intent**, not just authentication

