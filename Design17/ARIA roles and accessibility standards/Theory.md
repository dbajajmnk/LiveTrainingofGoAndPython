Here’s your **deep dive on ARIA roles & accessibility standards** using your engineering-first learning format.

---

# ARIA Roles & Accessibility Standards (Deep Dive)

---

## 1) What & Why

### What is ARIA?

**ARIA (Accessible Rich Internet Applications)** is a set of attributes that make web content more accessible, especially for users relying on assistive technologies.

Defined by World Wide Web Consortium under the Web Content Accessibility Guidelines.

---

### Why ARIA matters

Not all UI elements are naturally accessible.

Example:

```html
<div onclick="submitForm()">Submit</div>
```

For a screen reader:

* This is just a “div”
* No idea it’s a button

With ARIA:

```html
<div role="button" tabindex="0">Submit</div>
```

Now:

* Screen reader understands → button
* Keyboard users can focus it

---

## 2) Plain-English Mind Mapping

Think of ARIA like **adding labels in a building for visually impaired people**:

* A normal user → sees buttons, menus, forms
* A screen reader user → hears descriptions

ARIA helps translate UI into **meaningful spoken instructions**

---

## 3) Engineering Concept

Accessibility = **3 layers**

### 1. Semantic HTML (First priority)

Use native elements:

```html
<button>Submit</button>
```

### 2. ARIA (Enhancement layer)

Add meaning where HTML is insufficient.

### 3. Keyboard + Behavior

Ensure usability without mouse.

---

## 4) Golden Rule (Very Important)

> ❗ **Never use ARIA if native HTML can do the job**

Bad:

```html
<div role="button">Click</div>
```

Good:

```html
<button>Click</button>
```

---

# 5) Core ARIA Concepts

---

## 5.1 Roles (What is this element?)

![Image](https://s3.amazonaws.com/a-us.storyblok.com/f/1003313/1176x850/1571093ad9/landmark-roles.jpg)

![Image](https://developer.mozilla.org/en-US/blog/aria-accessibility-html-landmark-roles/region-role.png)

![Image](https://bati-itao.github.io/learning/esdc-self-paced-web-accessibility-course/module2/images/image1.png)

![Image](https://help.intrexx.com/intrexx/steady/en-us/Content/D-Resources/accessibility/accessibility-landmarks-illustrated.png)

### Example

```html
<div role="button">Click Me</div>
```

### Types of roles

---

### A) Landmark Roles

Used to define major page areas:

| Role            | Purpose      |
| --------------- | ------------ |
| `banner`        | Header       |
| `navigation`    | Menu         |
| `main`          | Main content |
| `complementary` | Sidebar      |
| `contentinfo`   | Footer       |

Example:

```html
<nav role="navigation">
  <a href="#">Home</a>
</nav>
```

---

### B) Widget Roles

Used for interactive UI:

| Role       | Example      |
| ---------- | ------------ |
| `button`   | Click action |
| `checkbox` | Toggle       |
| `dialog`   | Modal        |
| `tab`      | Tabs         |

Example:

```html
<div role="button" tabindex="0">Submit</div>
```

---

### C) Document Roles

| Role       | Purpose        |
| ---------- | -------------- |
| `article`  | Content block  |
| `list`     | List container |
| `listitem` | Item           |

---

## 5.2 States & Properties

ARIA also defines **states (dynamic)** and **properties (static info)**.

---

### Common ARIA attributes

| Attribute         | Meaning                  |
| ----------------- | ------------------------ |
| `aria-label`      | Text label               |
| `aria-labelledby` | Reference label          |
| `aria-hidden`     | Hide from screen readers |
| `aria-expanded`   | Open/closed              |
| `aria-checked`    | Checkbox state           |
| `aria-disabled`   | Disabled                 |

---

### Example

```html
<button aria-expanded="false">Menu</button>
```

When menu opens:

```html
<button aria-expanded="true">Menu</button>
```

---

## 5.3 Accessible Name

Every element must have a **clear name**.

### Ways to define it

```html
<button aria-label="Close">X</button>
```

or

```html
<label id="nameLabel">Name</label>
<input aria-labelledby="nameLabel">
```

---

# 6) Real UI Examples

---

## 6.1 Button (Custom)

```html
<div role="button" tabindex="0" onclick="submitForm()">
  Submit
</div>
```

But better:

```html
<button>Submit</button>
```

---

## 6.2 Modal (Dialog)

```html
<div role="dialog" aria-labelledby="title">
  <h2 id="title">Login</h2>
  <input type="text">
</div>
```

---

## 6.3 Dropdown

```html
<button aria-expanded="false" aria-controls="menu">
  Menu
</button>

<ul id="menu" hidden>
  <li>Item 1</li>
</ul>
```

---

## 6.4 Checkbox (Custom)

```html
<div role="checkbox" aria-checked="false" tabindex="0">
  Accept Terms
</div>
```

---

# 7) Accessibility Standards (WCAG)

![Image](https://images.openai.com/static-rsc-3/Wkh4WSKV8j9O70qyn0W9DeJSvcFcLLJurNgv1AEFch4Ix9a0_cZGpXAD1912hKSYXSDJjBEj2AtjK3qyjxoHPwe_vyGEKRX23CzCX1xaHb0?purpose=fullsize\&v=1)

![Image](https://images.openai.com/static-rsc-3/AqbXxrx5fwTMcmxxM7FRg4Uy9IuDIe0NIheBuUatTRp4fKwzuJDOPeXEIP8a_seOZUCFMgrlwdYmvjsxf8v1ztCbCo62t64VLDbp5PbtmJ0?purpose=fullsize\&v=1)

![Image](https://images.openai.com/static-rsc-3/JYMeJnZBNQzZOEyV8-4wYzQnnvWObTKaz5iqZQ3RQ4Q6S0kjENGktBdRWEXNLlxSC3pOmVzDnK3osFlY3Q5lYoUYnJCb_KdgX0or2zc07-k?purpose=fullsize\&v=1)

![Image](https://itss.d.umn.edu/sites/itss.d.umn.edu/files/pour.png)

### WCAG Principles (POUR)

---

### 1. Perceivable

Users must see/hear content

✔ Use alt text
✔ Provide captions

---

### 2. Operable

Users must interact

✔ Keyboard support
✔ No keyboard traps

---

### 3. Understandable

Content must be clear

✔ Consistent UI
✔ Simple language

---

### 4. Robust

Works across devices/tools

✔ Valid HTML
✔ ARIA support

---

## Levels

* A → basic
* AA → standard (industry)
* AAA → advanced

---

# 8) Keyboard Accessibility (Critical)

Every interactive element must be usable with keyboard.

### Important keys

* Tab → move focus
* Enter → activate
* Space → click
* Esc → close modal

---

### Example

```html
<div role="button" tabindex="0"
     onkeydown="if(event.key==='Enter'){submitForm()}">
  Submit
</div>
```

---

# 9) Common Mistakes

---

## Mistake 1: Overusing ARIA

```html
<div role="button">Click</div>
```

Use `<button>` instead.

---

## Mistake 2: Missing keyboard support

Clickable div without `tabindex` ❌

---

## Mistake 3: Wrong ARIA states

```html
aria-expanded="false"
```

But menu is open ❌

---

## Mistake 4: Missing labels

```html
<input type="text">
```

Should have:

```html
<label>Name</label>
<input type="text">
```

---

## Mistake 5: Hiding important content

```html
aria-hidden="true"
```

Used incorrectly → screen readers miss content

---

# 10) Practical Example (Accessible Page)

```html
<header>
  <h1>Accessible Website</h1>
</header>

<nav>
  <a href="#">Home</a>
</nav>

<main>
  <button aria-expanded="false">Menu</button>

  <article>
    <h2>Accessibility Guide</h2>
    <p>Make web usable for everyone.</p>
  </article>
</main>

<footer>
  <p>© 2026</p>
</footer>
```

---

# 11) Checklist (Real Project)

### Structure

* Semantic HTML first

### ARIA

* Only when needed
* Proper roles + states

### Accessibility

* Alt text
* Labels
* Keyboard support

### Testing

* Screen reader testing
* Tab navigation

---

# 12) Mini Practice Tasks

---

### Task 1

Convert this:

```html
<div onclick="openMenu()">Menu</div>
```

Into accessible version.

---

### Task 2

Build accessible modal:

* role="dialog"
* focus trap
* ESC to close

---

### Task 3

Create accessible form:

* labels
* error messages
* validation

---

# 13) Mini Project

Build:

### Accessible Dashboard UI

Include:

* navigation
* modal
* dropdown
* form
* keyboard navigation
* ARIA roles

---

# 14) Interview Answer

> ARIA improves accessibility by adding roles, states, and properties to HTML elements so assistive technologies can understand dynamic content. It should be used only when semantic HTML is insufficient, and must be combined with proper keyboard support and WCAG principles.

---

# 15) Final Understanding

**ARIA = adding meaning for assistive technologies when HTML alone is not enough.**

---
