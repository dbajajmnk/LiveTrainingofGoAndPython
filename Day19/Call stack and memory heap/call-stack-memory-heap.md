# 🧠 JavaScript: Call Stack & Memory Heap

---

## 🧩 1. What & Why

### 👉 What is Call Stack?
- A **stack (LIFO)** that manages function execution
- Tracks which function is currently running

### 👉 What is Memory Heap?
- A **large memory space**
- Stores objects, arrays, and functions

---

### 👉 Why is this important?

- Debug stack overflow errors
- Understand memory leaks
- Master closures & references
- Answer interview questions confidently

---

## 🧠 2. Mind Mapping (Real-Life Analogy)

### 📞 Call Stack = Call Center

- Last call → handled first
- Uses Push & Pop operations

---

### 📦 Memory Heap = Warehouse

- Stores large data
- Accessed using references

---

## ⚙️ 3. Engineering Concept

### 🔹 Call Stack Flow

```js
function a() {
  b();
}

function b() {
  c();
}

function c() {
  console.log("Hello");
}

a();
```

### Execution Flow

[ Global ]
   ↓
[ a() ]
   ↓
[ b() ]
   ↓
[ c() ]
   ↓
[ console.log ]
   ↑
Pop one by one

---

### 🔹 Memory Heap Example

```js
let user = { name: "Deepak" };

function greet(u) {
  console.log(u.name);
}

greet(user);
```

- user stored in Heap
- u gets reference

---

## 💻 4. Primitive vs Reference

```js
let a = 10;
let obj = { value: 20 };

function test(x, y) {
  x = 50;
  y.value = 100;
}

test(a, obj);

console.log(a);   // 10
console.log(obj); // { value: 100 }
```

---

## ⚠️ 5. Common Mistakes

### ❌ Object Copy Misunderstanding

```js
let a = { x: 1 };
let b = a;

b.x = 100;

console.log(a.x); // 100
```

### ❌ Stack Overflow

```js
function infinite() {
  infinite();
}

infinite();
```

### ❌ Memory Leak

```js
let arr = [];

function add() {
  arr.push(new Array(1000000));
}
```

---

## 🧪 6. Practice

### 🧠 Predict Output

```js
let x = { a: 1 };

function change(obj) {
  obj.a = 99;
}

change(x);

console.log(x.a);
```

Output: 99

---

### 🧠 Stack Order

```js
function one() {
  console.log("1");
  two();
}

function two() {
  console.log("2");
}

one();
```

Output:
1
2

---

## 🛠 Mini Project: Stack Tracker

```js
function track(name) {
  console.log("Enter:", name);

  return () => console.log("Exit:", name);
}

function a() {
  const exitA = track("A");

  function b() {
    const exitB = track("B");
    exitB();
  }

  b();
  exitA();
}

a();
```

---

## 🎯 Interview Summary

- Call Stack = Execution manager
- Heap = Memory storage
- Stack follows LIFO
- Objects stored in Heap (reference)
- Primitives stored in Stack (value)
- Each function creates a new stack frame

---
