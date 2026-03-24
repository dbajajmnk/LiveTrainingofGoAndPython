# 🧠 JavaScript: Hoisting & Temporal Dead Zone (TDZ)

---

## 🧩 1. What & Why

### 👉 What is Hoisting?
Hoisting is JavaScript’s behavior of moving declarations to the top of their scope before execution.

### 👉 What is Temporal Dead Zone (TDZ)?
TDZ is the time between variable declaration and initialization where the variable cannot be accessed.

---

### 👉 Why is this important?

- Avoid ReferenceError bugs
- Understand var, let, const behavior
- Improve debugging skills
- Important for interviews

---

## 🧠 2. Mind Mapping (Real-Life Analogy)

### 🏗 Hoisting = Booking Before Setup
- Variable name reserved first
- Value assigned later

### 🚫 TDZ = Restricted Zone
- Variable exists but locked
- Cannot access before initialization

---

## ⚙️ 3. Engineering Concept

### 🔹 var Hoisting

```js
console.log(a);
var a = 10;
```

Behind the scenes:

```js
var a;
console.log(a); // undefined
a = 10;
```

---

### 🔹 let / const Hoisting (TDZ)

```js
console.log(a); // ReferenceError
let a = 10;
```

---

## 💻 4. Examples

### Example 1: var vs let

```js
console.log(a); // undefined
var a = 5;

console.log(b); // ReferenceError
let b = 10;
```

---

### Example 2: const

```js
const x = 10;
x = 20; // TypeError
```

---

### Example 3: Function Hoisting

```js
sayHello();

function sayHello() {
  console.log("Hello");
}
```

---

### Example 4: Function Expression

```js
sayHi(); // Error

var sayHi = function () {
  console.log("Hi");
};
```

---

## ⚠️ 5. Common Mistakes

### ❌ Undefined vs ReferenceError

```js
console.log(a); // undefined
var a = 5;

console.log(b); // ReferenceError
let b = 10;
```

---

### ❌ TDZ confusion

```js
if (true) {
  console.log(x); // ReferenceError
  let x = 10;
}
```

---

### ❌ Function Expression misuse

```js
foo(); // Error

var foo = function () {};
```

---

## 🧪 6. Practice

### 🧠 Predict Output

```js
console.log(a);
var a = 10;

console.log(b);
let b = 20;
```

Output:
undefined
ReferenceError

---

### 🧠 Practice 2

```js
test();

function test() {
  console.log("Working");
}
```

Output:
Working

---

### 🧠 Practice 3

```js
var x = 1;

function demo() {
  console.log(x);
  var x = 2;
}

demo();
```

Output:
undefined

---

## 🛠 Mini Project: Hoisting Demo

```js
function simulateHoisting() {
  console.log("Before:", a);

  var a = 10;

  console.log("After:", a);
}

simulateHoisting();
```

---

## 🎯 Interview Summary

- Hoisting moves declarations to top
- var → initialized as undefined
- let/const → hoisted but in TDZ
- TDZ → cannot access before initialization
- Functions → fully hoisted
- Function expressions → not hoisted as functions

---
