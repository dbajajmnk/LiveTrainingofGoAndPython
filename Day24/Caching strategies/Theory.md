# Caching Strategies (Browser + Web Systems)

---

# 1) What is Caching?

Caching is the technique of **storing data temporarily so that future requests can be served faster**.

---

## Very simple meaning

👉 Instead of fetching again and again
👉 **reuse already available data**

---

# 2) Why do we need Caching?

Without caching:

* every request hits server
* every API call is repeated
* every image reloads
* every page fetch is slow

### Problems

* slow performance
* high network usage
* server overload
* poor user experience

---

### Caching solves:

* faster response
* reduced network calls
* better scalability
* smoother UI
* reduced backend load

---

# 3) When do we use Caching?

We use caching when:

* data does not change frequently
* repeated requests happen
* performance matters
* network cost is high
* response time needs improvement

---

# 4) Where is Caching used?

Caching is everywhere:

* browsers (HTTP cache)
* APIs
* databases
* CDNs
* frontend apps
* service workers
* memory storage

---

# 5) Real-Life Analogy

Imagine a student:

* first time → reads from book (slow)
* next time → remembers (fast)

👉 Book = server
👉 Memory = cache

---

# 6) Core Engineering Idea

Instead of:

```text
Client → Server → Response
Client → Server → Response
Client → Server → Response
```

We do:

```text
Client → Server → Response → Store in Cache
Client → Cache → Response
Client → Cache → Response
```

---

# 7) Types of Caching (High-Level)

1. Browser Cache
2. Memory Cache (Frontend)
3. HTTP Cache
4. CDN Cache
5. Service Worker Cache
6. API Response Cache
7. Database Cache

---

# 8) Browser Caching (HTTP Cache)

## What?

Browser stores:

* images
* CSS
* JS
* API responses

## Example Flow

```text
First request → fetch from server → store
Second request → fetch from cache
```

---

## Headers used

```http
Cache-Control: max-age=3600
```

Means:

👉 cache for 1 hour

---

# 9) Cache-Control Strategies

## Common directives

### 1. max-age

```http
Cache-Control: max-age=3600
```

Cache for 1 hour

---

### 2. no-cache

```http
Cache-Control: no-cache
```

Must revalidate with server

---

### 3. no-store

```http
Cache-Control: no-store
```

Do not cache at all

---

### 4. public / private

* public → can be cached by CDN
* private → only browser cache

---

# 10) Strong vs Weak Caching

## Strong Cache

Browser uses cached data without contacting server.

Example:

```http
Cache-Control: max-age=3600
```

---

## Weak Cache (Revalidation)

Browser checks with server:

```http
ETag: "abc123"
```

Then:

```http
If-None-Match: "abc123"
```

Server replies:

* 304 Not Modified → use cache
* 200 → new data

---

# 11) Memory Cache (Frontend)

## What?

Store data in JS memory

Example:

```javascript
const cache = {};

function getData(id) {
  if (cache[id]) return cache[id];

  const data = fetchData(id);
  cache[id] = data;
  return data;
}
```

---

## Use cases

* API responses
* computed values
* expensive calculations
* UI state reuse

---

# 12) Local Storage / Session Storage Cache

## Example

```javascript
localStorage.setItem("user", JSON.stringify(data));
```

## Types

* localStorage → persistent
* sessionStorage → per session

---

## Use cases

* user preferences
* tokens
* small API responses
* offline support

---

# 13) CDN Caching

## What?

Content Delivery Network caches content globally.

## Flow

```text
User → CDN → Server (only if needed)
```

---

## Benefits

* faster load
* lower latency
* reduced server load

---

## Real use cases

* images
* videos
* static assets
* scripts

---

# 14) Service Worker Caching

## What?

A script that runs in background and intercepts network requests.

## Example

```javascript
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
```

---

## Use cases

* offline apps
* PWA
* background sync
* advanced caching strategies

---

# 15) API Caching Strategies

## Problem

Repeated API calls slow apps.

## Solution

Cache responses.

---

## Example

```javascript
let cache = {};

async function getUser(id) {
  if (cache[id]) return cache[id];

  const res = await fetch(`/api/user/${id}`);
  const data = await res.json();

  cache[id] = data;
  return data;
}
```

---

# 16) Cache Invalidation (Very Important)

👉 Hardest problem in caching

---

## Why?

Data changes over time.

If cache is not updated:

* user sees stale data
* inconsistencies occur

---

## Strategies

1. Time-based (TTL)
2. Manual invalidation
3. Version-based cache
4. Event-based invalidation

---

# 17) TTL (Time To Live)

```javascript
cache[key] = {
  data,
  expiry: Date.now() + 5000
};
```

---

# 18) Cache Patterns

## 1. Cache First

```text
Cache → if miss → Server
```

Fastest

---

## 2. Network First

```text
Server → if fail → Cache
```

Fresh data preferred

---

## 3. Stale While Revalidate

```text
Return cache → update in background
```

Best balance

---

## 4. Cache Only

```text
Only use cache
```

Offline apps

---

## 5. Network Only

```text
Always fetch
```

Critical data

---

# 19) Stale While Revalidate (Important)

## Flow

```text
User request →
Return cached data instantly →
Fetch new data in background →
Update cache
```

---

## Example

```javascript
async function getData() {
  const cached = cache.data;
  fetch("/api").then(updateCache);

  return cached;
}
```

---

# 20) Real Use Case 1 — Ecommerce Product Page

* images → CDN cache
* product data → API cache
* recommendations → lazy + cache

---

# 21) Real Use Case 2 — Dashboard

* API responses cached
* charts reused
* filters reuse previous data

---

# 22) Real Use Case 3 — Chat App

* recent messages cached
* older messages lazy loaded
* offline support via service worker

---

# 23) Real Use Case 4 — News Website

* homepage cached
* images cached via CDN
* articles cached with TTL

---

# 24) Real Use Case 5 — PWA App

* offline cache
* service worker
* cache-first strategy

---

# 25) Common Mistakes

## 1. Not invalidating cache

👉 stale data problem

## 2. Over-caching dynamic data

👉 incorrect UI

## 3. Under-caching static data

👉 unnecessary requests

## 4. Ignoring cache headers

👉 browser can't optimize

## 5. Storing sensitive data in cache

👉 security issue

---

# 26) Performance Impact

Caching improves:

* page load speed
* API response time
* server scalability
* user experience
* battery usage

---

# 27) Trade-offs

## Pros

* fast
* efficient
* scalable

## Cons

* stale data risk
* complexity
* invalidation difficulty

---

# 28) Interview-Level Insight

👉 "Cache invalidation and distributed state are the hardest problems in system design."

---

# 29) Interview-Friendly Definition

Caching is a performance optimization technique where frequently accessed data is stored temporarily so that subsequent requests can be served faster without recomputing or refetching from the original source.

---

# 30) 20 MCQ Questions

## Questions

1. Caching means:
   A. deleting data
   B. storing data temporarily
   C. encrypting data
   D. compressing data

2. Cache improves:
   A. latency
   B. response time
   C. CPU usage only
   D. none

3. max-age defines:
   A. memory size
   B. cache duration
   C. CPU limit
   D. thread count

4. CDN is used for:
   A. computation
   B. caching content
   C. database
   D. encryption

5. Strong cache:
   A. revalidates always
   B. uses cache directly
   C. deletes cache
   D. reloads page

6. Weak cache uses:
   A. ETag
   B. DOM
   C. CSSOM
   D. JSON

7. Service worker works:
   A. backend only
   B. browser background
   C. database layer
   D. OS kernel

8. localStorage is:
   A. volatile
   B. persistent
   C. temporary
   D. network

9. Cache invalidation is:
   A. easy
   B. hardest problem
   C. not needed
   D. automatic

10. TTL means:
    A. total time limit
    B. time to live
    C. thread time logic
    D. task time loop

11. Cache-first strategy:
    A. always server
    B. cache first
    C. no cache
    D. random

12. Network-first:
    A. cache first
    B. server first
    C. no server
    D. DOM first

13. Stale-while-revalidate:
    A. slow
    B. balanced
    C. no cache
    D. only server

14. Cache reduces:
    A. network calls
    B. DOM nodes
    C. CSS rules
    D. memory always

15. API caching helps:
    A. slow apps
    B. fast response
    C. more errors
    D. less code

16. Browser cache stores:
    A. HTML/CSS/JS
    B. database
    C. RAM only
    D. threads

17. Over-caching causes:
    A. fresh data
    B. stale data
    C. fast UI always
    D. no issue

18. Cache is best for:
    A. dynamic real-time data
    B. static or repeated data
    C. random data
    D. unused data

19. Service worker helps:
    A. offline caching
    B. database
    C. routing
    D. memory

20. Best summary:
    A. cache = faster reuse
    B. cache = delete data
    C. cache = block requests
    D. cache = DOM

---

## Answers

1. B
2. B
3. B
4. B
5. B
6. A
7. B
8. B
9. B
10. B
11. B
12. B
13. B
14. A
15. B
16. A
17. B
18. B
19. A
20. A

---

# 31) Subjective Questions

1. What is caching?
2. Why is caching important?
3. What is cache invalidation?
4. Difference between strong and weak caching
5. What is CDN caching?
6. What is service worker caching?
7. What is stale-while-revalidate?
8. When should caching be avoided?
9. What are cache strategies?
10. What are common caching mistakes?

---

# 32) Practical Exercises

## Practice 1 — Simple cache

```javascript
const cache = {};

function getData(key) {
  if (cache[key]) return cache[key];

  const data = key + " result";
  cache[key] = data;

  return data;
}
```

---

## Practice 2 — API cache

```javascript
let cache = {};

async function fetchData(url) {
  if (cache[url]) return cache[url];

  const res = await fetch(url);
  const data = await res.json();

  cache[url] = data;
  return data;
}
```

---

## Practice 3 — TTL cache

```javascript
let cache = {};

function setCache(key, value) {
  cache[key] = {
    value,
    expiry: Date.now() + 5000
  };
}
```

---

# 33) Final Summary

## Core Idea

👉 Cache = reuse data instead of recomputing

## Key Points

* improves performance
* reduces load
* must handle invalidation
* multiple strategies exist

## Golden Rule

👉 Cache smartly, invalidate correctly
