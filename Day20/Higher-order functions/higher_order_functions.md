# Higher-Order Functions in Real-World Systems — JavaScript

## 1) What is a Higher-Order Function?

A Higher-Order Function (HOF) is a function that:
- takes another function as input
- OR returns another function
- OR both

Example:
```javascript
function greet(name) {
  return "Hello " + name;
}

function processUser(callback) {
  return callback("Deepak");
}

console.log(processUser(greet));
```

---

## 2) Why do we need HOF?

- Reusability
- Dynamic behavior
- Clean architecture
- Avoid duplication

---

## 3) When to use?

- Dynamic logic
- Middleware
- Array processing
- Async flows
- Logging, retry, debounce

---

## 4) How it works?

Function → receives function → executes or returns function

---

## 5) Real-life analogy

Chef = HOF  
Recipe = function  
Dish = output  

---

## 6) Engineering View

Pass behavior instead of hardcoding logic

---

## 7) Syntax

```javascript
function execute(fn) {
  fn();
}

function multiplier(x) {
  return function(y) {
    return x * y;
  };
}
```

---

## 8) Real-world use cases

- Logger
- Auth middleware
- Retry
- Debounce
- map/filter/reduce

---

## 9) Mistakes

- Passing fn() instead of fn
- Forgetting return
- Over nesting

---

## 10) Deep concepts

- HOF + closure
- Callback vs HOF

---

## 11) 50 MCQs (Questions)

(Refer full MCQ list provided in training content)

---

## 12) MCQ Answers

(Refer answer key section)

---

## 13) Subjective Q&A

- What is HOF?
- Why needed?
- Real-world usage?

---

## 14) Assignments

- Build map
- Build filter
- Build reduce
- Build debounce
- Build retry

---

## 15) Mini Projects

- Middleware system
- Logging framework
- Retry API system
- Search optimization

---

## 16) Interview Notes

- HOF definition
- Callback vs HOF
- Implement debounce

---

## 17) Summary

Higher-Order Functions make code reusable, dynamic, and scalable.
