# 🧠 JavaScript: Scope Chain & Lexical Environment

---

## 🧩 1. What & Why

### 👉 What is Scope?
Scope defines where variables can be accessed in your code.

### 👉 What is Scope Chain?
Scope Chain is the process of searching variables from current scope to outer scopes.

### 👉 What is Lexical Environment?
Lexical Environment is the structure that holds:
- Variables
- Functions
- Reference to parent scope

---

### 👉 Why is this important?

- Helps understand variable access
- Core concept behind closures
- Important for debugging and interviews

---

## 🧠 2. Mind Mapping (Real-Life Analogy)

### 🏠 Scope = Rooms in a House
- Each room has its own items
- Can access items from parent rooms

### 🔗 Scope Chain = Asking Neighbors
- If not found in current room
- Ask parent room → then next → then global

---

## ⚙️ 3. Engineering Concept

---

### 🔹 Example

```js
let a = 10;

function outer() {
  let b = 20;

  function inner() {
    let c = 30;
    console.log(a, b, c);
  }

  inner();
}

outer();
```

---

### 🔍 How Scope Chain Works

- inner() looks for variables:
  - c → found locally
  - b → found in outer()
  - a → found in global scope

---

## 💻 4. Lexical Environment

Each function creates:
- Environment Record (variables)
- Reference to outer environment

---

### 🔹 Representation

Global:
a → 10

outer():
b → 20 → reference → global

inner():
c → 30 → reference → outer

---

## ⚠️ 5. Common Mistakes

---

### ❌ Accessing out of scope

```js
function test() {
  let x = 10;
}

console.log(x); // Error
```

---

### ❌ Shadowing confusion

```js
let x = 10;

function demo() {
  let x = 20;
  console.log(x);
}

demo(); // 20
```

---

### ❌ Misunderstanding scope chain

```js
let a = 1;

function one() {
  function two() {
    console.log(a);
  }
  two();
}

one(); // 1
```

---

## 🧪 6. Practice

---

### 🧠 Predict Output

```js
let x = 1;

function a() {
  let x = 2;

  function b() {
    console.log(x);
  }

  b();
}

a();
```

Output:
2

---

### 🧠 Practice 2

```js
let x = 1;

function a() {
  function b() {
    console.log(x);
  }

  b();
}

a();
```

Output:
1

---

## 🛠 Mini Project: Scope Visualizer

```js
function scopeTracker(name) {
  console.log("Entering:", name);

  return () => console.log("Exiting:", name);
}

function outer() {
  let a = 10;
  const exitOuter = scopeTracker("Outer");

  function inner() {
    let b = 20;
    const exitInner = scopeTracker("Inner");

    console.log("Access:", a, b);

    exitInner();
  }

  inner();
  exitOuter();
}

outer();
```

---

## 🎯 Interview Summary

- Scope defines accessibility
- Scope Chain = lookup mechanism
- Lexical Environment = memory + reference
- Inner functions access outer variables
- JavaScript uses lexical scoping

---

## 🚀 Next Topics

- Closures 🔥
- Event Loop
- Garbage Collection

---
