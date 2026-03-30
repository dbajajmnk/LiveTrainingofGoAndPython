# Microtasks vs Macrotasks (JavaScript)
---
# 1) What are Microtasks and Macrotasks?

In JavaScript async execution, tasks are divided into **two main queues**:

## Microtasks

High-priority tasks that run **immediately after the current code finishes**, before any macrotask.

## Macrotasks (Task Queue)

Lower-priority tasks that run **after microtasks are completed**.

---

### Very Simple Meaning

* **Microtasks = urgent tasks**
* **Macrotasks = normal tasks**

---

# 2) Why do we need this separation?

Because not all async tasks are equal.

Some tasks need to run **immediately after current execution**, while others can wait.

### Example

* Promise resolution → should run immediately → microtask
* `setTimeout` → can wait → macrotask

This separation ensures:

* predictable behavior
* smooth UI updates
* proper chaining of async logic
* performance optimization

---

# 3) When do Microtasks vs Macrotasks happen?

## Microtasks happen when:

* a promise resolves
* `.then()`, `.catch()`, `.finally()` runs
* `queueMicrotask()` is used

## Macrotasks happen when:

* `setTimeout`
* `setInterval`
* DOM events (click, input)
* message queue tasks
* some I/O operations

---

# 4) Where are they used?

In almost every real app:

* API responses → microtasks (via promises)
* delayed UI updates → macrotasks
* button clicks → macrotasks
* async/await → microtasks
* animations → macrotasks
* chaining logic → microtasks

---

# 5) How do they work together?

## Execution order:

1. Run synchronous code
2. Run all microtasks
3. Run one macrotask
4. Repeat

---

# 6) Real-Life Analogy

Imagine a **CEO’s task system**:

* Urgent emails → handled immediately → **microtasks**
* Regular scheduled meetings → handled later → **macrotasks**

Flow:

* finish current work
* clear all urgent tasks
* then handle next scheduled task

---

# 7) Core Engineering Rule

## Golden Rule

👉 After each synchronous execution:

```text
1. Execute ALL microtasks
2. THEN execute ONE macrotask
```

This repeats continuously.

---

# 8) Basic Example

```javascript
console.log("Start");

setTimeout(() => {
  console.log("Timeout");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise");
});

console.log("End");
```

## Output

```javascript
Start
End
Promise
Timeout
```

---

# 9) Step-by-Step Execution

### Step 1 — Sync code runs

```javascript
Start
End
```

### Step 2 — Microtasks run

```javascript
Promise
```

### Step 3 — Macrotasks run

```javascript
Timeout
```

---

# 10) Why Microtasks Run First?

Because they represent **continuation logic**.

Example:

```javascript
fetchData()
  .then(processData)
  .then(showUI);
```

If these were delayed behind timers, logic would break.

So JavaScript ensures:

👉 Promise chains run immediately after current code.

---

# 11) Microtask Queue

Contains:

* Promise `.then()`
* Promise `.catch()`
* Promise `.finally()`
* `queueMicrotask()`

### Example

```javascript
queueMicrotask(() => {
  console.log("Microtask");
});
```

---

# 12) Macrotask Queue

Contains:

* `setTimeout`
* `setInterval`
* DOM events
* I/O operations

---

# 13) Multiple Microtasks Example

```javascript
console.log("Start");

Promise.resolve().then(() => console.log("Micro 1"));
Promise.resolve().then(() => console.log("Micro 2"));

setTimeout(() => console.log("Timeout"), 0);

console.log("End");
```

## Output

```javascript
Start
End
Micro 1
Micro 2
Timeout
```

---

# 14) Important Rule

## All microtasks are completed before next macrotask

Even if there are many microtasks.

---

# 15) Microtask Chaining Example

```javascript
Promise.resolve()
  .then(() => {
    console.log("A");
    return Promise.resolve();
  })
  .then(() => {
    console.log("B");
  });

setTimeout(() => console.log("C"), 0);
```

## Output

```javascript
A
B
C
```

---

# 16) Why This Happens

Because:

* `.then()` creates microtasks
* microtasks keep running until empty
* only then macrotask runs

---

# 17) Infinite Microtask Danger

```javascript
function loop() {
  Promise.resolve().then(loop);
}

loop();
```

This can block macrotasks forever.

### Why?

Because microtasks keep adding more microtasks.

Macrotask queue never gets a chance.

---

# 18) `async/await` Behavior

```javascript
async function test() {
  console.log("1");
  await Promise.resolve();
  console.log("2");
}

console.log("Start");
test();
console.log("End");
```

## Output

```javascript
Start
1
End
2
```

---

# 19) Why?

Because:

* `await` pauses function
* rest is scheduled as microtask
* microtask runs after sync code

---

# 20) Microtask vs Macrotask Timeline

```text
SYNC → MICROTASKS → MACROTASK → MICROTASKS → MACROTASK ...
```

---

# 21) Real Use Case 1 — API Handling

```javascript
fetch("/api/data")
  .then(() => console.log("Data processed"));

setTimeout(() => console.log("UI update"), 0);
```

### Output

```javascript
Data processed
UI update
```

Because promise is microtask.

---

# 22) Real Use Case 2 — UI Click

```javascript
button.addEventListener("click", () => {
  console.log("Clicked");
});
```

Click event goes to **macrotask queue**.

---

# 23) Real Use Case 3 — Animation Delay

```javascript
setTimeout(() => {
  console.log("Animation done");
}, 500);
```

This is macrotask.

---

# 24) Real Use Case 4 — Promise Chain

```javascript
Promise.resolve()
  .then(() => console.log("Step 1"))
  .then(() => console.log("Step 2"));
```

Runs as microtasks immediately after sync code.

---

# 25) Key Differences Table

| Feature   | Microtasks                   | Macrotasks             |
| --------- | ---------------------------- | ---------------------- |
| Priority  | High                         | Low                    |
| Runs      | After sync, before macrotask | After microtasks       |
| Examples  | Promise, queueMicrotask      | setTimeout, events     |
| Execution | All executed                 | One per cycle          |
| Use case  | Continuation logic           | Scheduled/delayed work |

---

# 26) Common Mistakes

## 1. Thinking `setTimeout` runs immediately

Wrong — it's a macrotask.

## 2. Forgetting promises are microtasks

Causes wrong output predictions.

## 3. Not knowing priority difference

Leads to debugging confusion.

## 4. Ignoring microtask chaining

Multiple `.then()` run before timers.

## 5. Blocking loop misunderstanding

Microtasks can starve macrotasks.

---

# 27) Deep Comparison Example

```javascript
console.log("1");

setTimeout(() => console.log("2"), 0);

Promise.resolve().then(() => console.log("3"));

Promise.resolve().then(() => console.log("4"));

console.log("5");
```

## Output

```javascript
1
5
3
4
2
```

---

# 28) Why This Order?

1 → sync
5 → sync
3, 4 → microtasks
2 → macrotask

---

# 29) Interview-Friendly Explanation

Microtasks and macrotasks are two types of queues used in JavaScript’s event loop. Microtasks have higher priority and are executed immediately after the current synchronous code, while macrotasks are executed afterward. Promise callbacks go into the microtask queue, whereas tasks like `setTimeout` go into the macrotask queue.

---

# 30) 20 MCQ Questions

## Questions

### 1. Microtasks are:

A. lower priority tasks
B. higher priority tasks
C. CSS tasks
D. database tasks

### 2. Macrotasks include:

A. Promise.then
B. setTimeout
C. queueMicrotask
D. async/await

### 3. Which runs first?

A. macrotask
B. microtask
C. both same
D. random

### 4. Promise `.then()` goes to:

A. macrotask queue
B. microtask queue
C. call stack
D. memory

### 5. setTimeout goes to:

A. microtask
B. macrotask
C. prototype
D. class

### 6. After sync code:

A. macrotasks run first
B. microtasks run first
C. none run
D. both run together

### 7. Microtasks are executed:

A. one at a time only
B. all before macrotask
C. never fully
D. only once

### 8. Which is microtask?

A. click event
B. setTimeout
C. Promise.then
D. setInterval

### 9. Which is macrotask?

A. Promise.then
B. queueMicrotask
C. setTimeout
D. await

### 10. async/await is based on:

A. arrays
B. promises
C. DOM
D. loops

### 11. Microtasks are used for:

A. delayed UI only
B. continuation logic
C. CSS styling
D. DOM rendering only

### 12. Macrotasks are used for:

A. scheduling tasks
B. promise chaining
C. lexical scope
D. closures

### 13. Multiple microtasks:

A. run partially
B. run before macrotask
C. skip execution
D. wait for timers

### 14. Infinite microtask loop can:

A. speed up code
B. block macrotasks
C. remove queue
D. reset stack

### 15. queueMicrotask():

A. creates macrotask
B. creates microtask
C. deletes task
D. blocks stack

### 16. Which runs later?

A. microtask
B. macrotask
C. sync code
D. all same

### 17. Promise chaining:

A. macrotask
B. microtask
C. stack only
D. loop only

### 18. Which is correct order?

A. sync → macro → micro
B. sync → micro → macro
C. macro → micro → sync
D. micro → sync → macro

### 19. Microtasks run:

A. after each macrotask
B. before next macrotask
C. never again
D. only once

### 20. Best summary:

A. microtasks first, macrotasks later
B. macrotasks first
C. both same
D. no difference

---

## MCQ Answers

1. B
2. B
3. B
4. B
5. B
6. B
7. B
8. C
9. C
10. B
11. B
12. A
13. B
14. B
15. B
16. B
17. B
18. B
19. B
20. A

---

# 31) 10 Subjective Questions

## Questions

1. What are microtasks and macrotasks?
2. Why are microtasks given higher priority?
3. What is the difference between them?
4. How does event loop process them?
5. Why do promises use microtasks?
6. Why is setTimeout a macrotask?
7. What happens if microtasks keep adding more tasks?
8. How does async/await use microtasks?
9. What is the execution order of microtasks vs macrotasks?
10. What are common mistakes developers make?

---

## Answers

(Short, clean, interview-ready)

Microtasks are high-priority tasks like promise callbacks that run immediately after synchronous code. Macrotasks are scheduled tasks like timers and events that run after microtasks. The event loop always processes microtasks completely before moving to the next macrotask. This ensures predictable execution for promise-based logic.

---

# 32) Practical Exercises

## Practice 1

```javascript
console.log("A");

setTimeout(() => console.log("B"), 0);

Promise.resolve().then(() => console.log("C"));

console.log("D");
```

---

## Practice 2

```javascript
Promise.resolve().then(() => console.log("1"));
Promise.resolve().then(() => console.log("2"));
console.log("3");
```

---

## Practice 3

```javascript
setTimeout(() => console.log("Timeout 1"), 0);
setTimeout(() => console.log("Timeout 2"), 0);

Promise.resolve().then(() => console.log("Promise"));
```

---

## Practice 4

```javascript
async function test() {
  console.log("A");
  await Promise.resolve();
  console.log("B");
}

test();
console.log("C");
```

---

## Practice 5

Create your own example combining:

* sync logs
* promises
* timeout

---

# 33) Mini Projects

1. API + UI order simulator
2. Promise chain visualizer
3. Timer vs promise demo
4. Async/await flow analyzer
5. Event loop blocking demo

---

# 34) Assignment

## Part A

Explain in your own words:

* microtasks vs macrotasks
* execution order
* why priority exists

## Part B

Write code examples for:

* promise vs timeout
* async/await flow
* multiple microtasks

## Part C

Real-world explanation:

* API handling
* UI updates
* animations
* event handling

---

# 35) Final Summary

## Core Rule

👉 Sync → Microtasks → Macrotasks

## Key Understanding

* promises = microtasks
* timers/events = macrotasks
* microtasks always finish first

## Easy Memory Trick

👉 “Finish urgent tasks (micro) before scheduled tasks (macro)”

---


