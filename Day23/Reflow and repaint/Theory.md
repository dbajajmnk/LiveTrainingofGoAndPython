# JavaScript / Browser Rendering: Reflow and Repaint

## 1) What are Reflow and Repaint?

When something on a webpage changes, the browser may need to update the screen.

That update can happen in two major ways:

## Reflow

Reflow means the browser recalculates the **layout** of elements.

It checks things like:

* width
* height
* position
* spacing
* element relationships

## Repaint

Repaint means the browser redraws the **visual appearance** of elements.

It updates things like:

* color
* background
* border color
* shadow
* visibility-related painting

---

## Very short definition

* **Reflow = layout recalculation**
* **Repaint = visual redraw**

---

# 2) Why do we need Reflow and Repaint?

Browsers need them because webpages are not static.

Pages keep changing due to:

* JavaScript updates
* user clicks
* resizing browser
* changing styles
* dynamic content loading
* showing or hiding UI parts

When changes happen, the browser must decide:

* do I need to recalculate layout?
* or do I just need to redraw appearance?

That is where reflow and repaint come in.

---

# 3) When do Reflow and Repaint happen?

They happen when page structure or style changes.

## Reflow usually happens when:

* element size changes
* element position changes
* DOM nodes are added/removed
* text changes affect size
* window is resized
* font size changes
* layout-related CSS changes

## Repaint usually happens when:

* color changes
* background changes
* border color changes
* shadow changes
* visibility of painting changes without layout shift

---

# 4) Where do Reflow and Repaint matter?

They matter in all browser-based applications:

* websites
* dashboards
* forms
* ecommerce pages
* animations
* admin panels
* games in browser
* real-time apps
* SPAs like React, Angular, Vue

### Real project examples

* changing cart count
* expanding sidebar
* opening modal
* changing button color on hover
* showing validation message
* resizing cards in dashboard

---

# 5) How do Reflow and Repaint work?

Browser rendering roughly follows this flow:

1. parse HTML
2. build DOM
3. parse CSS
4. build CSSOM
5. create render tree
6. calculate layout
7. paint screen

Later, if page changes:

* browser may do reflow
* browser may do repaint
* sometimes both happen

### Important rule

**Reflow often leads to repaint.**
But repaint does not always require reflow.

---

# 6) Real-Life Analogy

Imagine a room.

## Reflow example

You move a bed from one corner to another and add a table.
Now the whole room layout may need adjustment.

That is like **reflow**.

## Repaint example

You keep furniture in the same place, but change wall color from white to blue.

That is like **repaint**.

### Mapping

* room layout = browser layout
* moving furniture = reflow
* changing paint color = repaint

---

# 7) Core Engineering Idea

The browser tries to draw the page efficiently.

But if you change something that affects layout, the browser may need to:

* recalculate element boxes
* check parent-child impact
* update neighboring elements
* recalculate positions and sizes

That is more expensive than simply redrawing color.

So:

* **reflow is heavier**
* **repaint is lighter**

---

# 8) What is Reflow in Detail?

Reflow is also often called **layout recalculation**.

When reflow happens, browser recalculates:

* element size
* element position
* relation with siblings
* relation with parent
* possible changes to child layout

### Example

```javascript
box.style.width = "300px";
```

If width changes, the browser may need to check:

* does this affect nearby elements?
* does parent layout change?
* does wrapping change?
* does height change too?

That is reflow.

---

# 9) What is Repaint in Detail?

Repaint happens when layout stays same, but appearance changes.

### Example

```javascript
box.style.color = "red";
```

The element stays in same place.
Its size does not change.
Only the visual look changes.

So browser usually just redraws it.

That is repaint.

---

# 10) Simple Difference Table

| Feature                | Reflow                       | Repaint                  |
| ---------------------- | ---------------------------- | ------------------------ |
| Main meaning           | layout recalculation         | visual redraw            |
| Expensive?             | more expensive               | less expensive           |
| Affects position/size? | yes                          | no                       |
| Example                | width, height, margin change | color, background change |
| May trigger the other? | often leads to repaint       | usually not reflow       |

---

# 11) Example of Reflow

```html
<div id="box">Hello</div>

<script>
  const box = document.getElementById("box");
  box.style.width = "400px";
</script>
```

## Analysis

Changing width may affect:

* element size
* surrounding layout
* wrapping
* positions of other elements

So browser does reflow, then repaint.

---

# 12) Example of Repaint

```html
<div id="box">Hello</div>

<script>
  const box = document.getElementById("box");
  box.style.backgroundColor = "black";
  box.style.color = "white";
</script>
```

## Analysis

* no size change
* no position change
* same layout
* just visual redraw

So this is mainly repaint.

---

# 13) Important Rule

## Reflow often causes repaint

If layout changes, browser usually needs to repaint because the visible output changed too.

## Repaint does not always cause reflow

If only color changes, layout remains same.

---

# 14) What Changes Commonly Trigger Reflow?

Common reflow triggers include:

* width
* height
* padding
* margin
* border width
* font-size
* line-height
* display
* position
* top/left/right/bottom
* adding/removing DOM nodes
* changing text content that affects layout
* resizing browser window

---

# 15) What Changes Commonly Trigger Repaint?

Common repaint triggers include:

* color
* background-color
* border-color
* box-shadow
* outline
* visibility in some visual-only contexts

These usually change appearance without changing geometry.

---

# 16) DOM Changes and Reflow

DOM changes can trigger reflow because layout may be affected.

Example:

```javascript
const li = document.createElement("li");
li.textContent = "New Item";
document.getElementById("list").appendChild(li);
```

## Analysis

Adding a new item changes:

* content height
* layout of list
* maybe parent container height
* maybe scrollbar state

So reflow may happen.

---

# 17) Text Changes and Reflow

Example:

```javascript
title.textContent = "A much longer heading than before";
```

If text becomes longer, browser may need to recalculate:

* width usage
* line breaks
* height
* nearby layout

So even text updates can trigger reflow.

---

# 18) Style Changes and Repaint Only

Example:

```javascript
button.style.backgroundColor = "green";
```

If button keeps same size and position, browser usually just repaints.

---

# 19) Hidden Element Example

## `display: none`

If you change:

```javascript
element.style.display = "none";
```

This affects layout because the element is removed from layout flow.

So this can trigger reflow.

---

## `visibility: hidden`

If you change:

```javascript
element.style.visibility = "hidden";
```

The element becomes invisible but still keeps layout space.

This is often more about repaint than full layout removal.

---

# 20) Real Use Case 1 — Form Validation

### Scenario

A validation message appears below an input.

```javascript
error.textContent = "Email is required";
error.style.display = "block";
```

## Analysis

* showing hidden element may affect layout
* input section height changes
* surrounding layout may shift

So this can trigger reflow and repaint.

---

# 21) Real Use Case 2 — Button Hover

```css
button:hover {
  background-color: blue;
}
```

## Analysis

If only background changes:

* same size
* same position
* only visual redraw

This is repaint.

---

# 22) Real Use Case 3 — Sidebar Expansion

```javascript
sidebar.style.width = "300px";
```

## Analysis

Changing sidebar width may affect:

* main content width
* page layout
* positioning of neighboring sections

This is reflow, then repaint.

---

# 23) Real Use Case 4 — Todo List Add Item

```javascript
const item = document.createElement("li");
item.textContent = "Learn rendering";
list.appendChild(item);
```

## Analysis

List layout changes.
Parent height may change.
Scrolling may change.

This causes reflow.

---

# 24) Real Use Case 5 — Theme Change

```javascript
document.body.classList.toggle("dark");
```

## Analysis

Depends on what CSS changes.

If dark mode changes only:

* colors
* background
* shadows

Then mostly repaint.

If dark mode also changes:

* spacing
* font sizes
* layout-related properties

Then reflow may also happen.

---

# 25) Why Reflow Is More Expensive

Reflow is heavier because browser must recalculate layout rules.

It may need to check:

* this element
* parent container
* siblings
* child elements
* wrapping behavior
* viewport relation

That is more work than simply recoloring pixels.

---

# 26) Why Performance Matters

Too many reflows or forced layouts can cause:

* laggy UI
* slow typing
* janky animation
* poor scrolling
* delayed clicks
* bad user experience

So browser performance work often means reducing unnecessary layout recalculations.

---

# 27) Layout Thrashing

This is a very important practical topic.

Layout thrashing happens when code repeatedly:

1. reads layout info
2. writes layout-changing style
3. reads again
4. writes again

Example pattern:

```javascript
for (let i = 0; i < 100; i++) {
  box.style.width = (100 + i) + "px";
  console.log(box.offsetWidth);
}
```

This can cause repeated forced layout work.

---

# 28) Why Layout Thrashing Is Bad

Because browser cannot optimize well when code keeps asking:

* “change layout”
* “now tell me exact layout”
* “change again”
* “tell again”

That creates performance issues.

---

# 29) Better Performance Practice

Batch DOM reads and writes separately when possible.

### Better idea

* read needed values first
* then apply multiple style changes together

Example:

```javascript
const currentWidth = box.offsetWidth;

box.style.width = currentWidth + 50 + "px";
box.style.height = "200px";
box.style.marginTop = "10px";
```

This is usually better than mixing read/write repeatedly.

---

# 30) Reflow vs Repaint in Animation

Animations using layout-heavy properties can be expensive.

### More expensive animation examples

* width
* height
* left
* top
* margin

These can trigger reflow.

### Usually better animation properties

* transform
* opacity

These are often more efficient because they avoid full layout recalculation.

---

# 31) Example Comparison

## Expensive

```javascript
box.style.left = "200px";
```

May affect layout/position calculations.

## Better for animation

```javascript
box.style.transform = "translateX(200px)";
```

Often smoother because it avoids layout recalculation in many cases.

---

# 32) Common Mistakes

## 1. Thinking every style change is same cost

Not true. Some trigger reflow, some only repaint.

## 2. Ignoring repeated DOM/style updates

Too many changes can hurt performance.

## 3. Using layout-changing properties in heavy animation

This may cause jank.

## 4. Confusing `display: none` with `visibility: hidden`

They affect layout differently.

## 5. Reading layout after every style write

This can create layout thrashing.

---

# 33) Beginner-Friendly Comparison

## Reflow

Browser recalculates structure-related layout.

### Think:

“Did the size or position change?”

## Repaint

Browser redraws appearance without changing layout.

### Think:

“Did only the visual color/look change?”

---

# 34) Interview-Friendly Definition

If asked:

**What is the difference between reflow and repaint?**

You can say:

Reflow is the browser’s process of recalculating layout when changes affect element size, position, or document flow. Repaint is the process of redrawing an element’s visual appearance when layout stays the same. Reflow is usually more expensive and often leads to repaint.

---

# 35) 20 MCQ Questions

## Questions

### 1. Reflow mainly means:

A. API request
B. layout recalculation
C. promise resolution
D. event bubbling

### 2. Repaint mainly means:

A. visual redraw
B. database update
C. event loop restart
D. object cloning

### 3. Which is usually more expensive?

A. repaint
B. reflow
C. both always same
D. none

### 4. Changing width usually triggers:

A. repaint only
B. reflow
C. promise chain
D. microtask

### 5. Changing text color usually triggers:

A. repaint
B. reflow always
C. DOM deletion
D. queue update

### 6. Reflow often leads to:

A. repaint
B. no screen change
C. memory deletion
D. recursion

### 7. Repaint usually does not require:

A. color redraw
B. layout recalculation
C. style engine
D. visual update

### 8. Which can trigger reflow?

A. width change
B. background color change
C. text color change
D. box shadow color only

### 9. Which can often trigger repaint only?

A. color change
B. height change
C. margin change
D. display change

### 10. Adding a DOM element may trigger:

A. reflow
B. repaint only always
C. no effect
D. closure creation

### 11. `display: none` is more related to:

A. layout impact
B. only promise update
C. only microtask
D. only array mutation

### 12. `visibility: hidden` often keeps:

A. no style
B. no DOM
C. layout space
D. no render cost at all

### 13. Which is bad for performance if repeated heavily?

A. optimized batching
B. layout thrashing
C. static HTML
D. comments

### 14. Which pattern can cause layout thrashing?

A. repeated read-write-read-write layout operations
B. using constants
C. using arrays
D. using semicolons

### 15. Better animation property for performance is often:

A. width
B. margin-left
C. transform
D. top

### 16. Reflow may happen when:

A. window resized
B. color changed only
C. promise resolved
D. variable renamed

### 17. Repaint is more about:

A. geometry
B. visual appearance
C. constructor logic
D. async control flow

### 18. Which statement is true?

A. repaint always causes reflow
B. reflow often causes repaint
C. reflow is cheaper than repaint
D. neither affects rendering

### 19. Changing font size may trigger:

A. repaint only
B. reflow
C. no update
D. callback queue

### 20. Best summary:

A. reflow = layout, repaint = redraw
B. reflow = redraw, repaint = layout
C. both are same
D. both are unrelated to browser rendering

---

## MCQ Answers

1. B
2. A
3. B
4. B
5. A
6. A
7. B
8. A
9. A
10. A
11. A
12. C
13. B
14. A
15. C
16. A
17. B
18. B
19. B
20. A

---

# 36) 10 Subjective Questions

## Questions

1. What is reflow in browser rendering?
2. What is repaint in browser rendering?
3. Why is reflow more expensive than repaint?
4. Give examples of changes that trigger reflow.
5. Give examples of changes that trigger repaint.
6. Why does reflow often lead to repaint?
7. What is layout thrashing?
8. Why is layout thrashing bad for performance?
9. Why are `transform` and `opacity` often better for animations?
10. What are common beginner mistakes about reflow and repaint?

---

## Answers

### 1. What is reflow in browser rendering?

Reflow is the process where the browser recalculates layout because a change affected element size, position, or document flow.

### 2. What is repaint in browser rendering?

Repaint is the process where the browser redraws the visual appearance of elements when layout remains unchanged.

### 3. Why is reflow more expensive than repaint?

Because reflow may require recalculating positions, sizes, and relationships of multiple elements, while repaint is mainly visual redraw work.

### 4. Give examples of changes that trigger reflow.

Examples include changing width, height, font-size, display, adding/removing DOM nodes, resizing the window, or changing long text.

### 5. Give examples of changes that trigger repaint.

Examples include changing color, background-color, border color, box-shadow, or other appearance-only properties.

### 6. Why does reflow often lead to repaint?

Because once layout changes, the browser usually must redraw the updated visual result too.

### 7. What is layout thrashing?

Layout thrashing is repeated forced layout work caused by frequently mixing DOM reads and layout-changing writes in a loop or rapid sequence.

### 8. Why is layout thrashing bad for performance?

It prevents the browser from optimizing rendering efficiently and can cause lag, jank, and slow UI updates.

### 9. Why are `transform` and `opacity` often better for animations?

Because they often avoid full layout recalculation and are generally cheaper for the browser to animate smoothly.

### 10. What are common beginner mistakes about reflow and repaint?

Common mistakes include assuming all style changes cost the same, overusing layout-changing properties, and reading layout immediately after repeated writes.

---

# 37) Practical Beginner Exercises

## Practice 1 — Repaint example

```html
<div id="box">Hello</div>

<script>
  const box = document.getElementById("box");
  box.style.color = "red";
  box.style.backgroundColor = "yellow";
</script>
```

### Observe

This mainly changes appearance.

---

## Practice 2 — Reflow example

```html
<div id="box">Hello</div>

<script>
  const box = document.getElementById("box");
  box.style.width = "400px";
  box.style.height = "200px";
</script>
```

### Observe

This affects layout.

---

## Practice 3 — Add element

```html
<ul id="list"></ul>

<script>
  const li = document.createElement("li");
  li.textContent = "New task";
  document.getElementById("list").appendChild(li);
</script>
```

### Observe

Layout may change.

---

## Practice 4 — `display` vs `visibility`

```html
<div id="box">Hello</div>

<script>
  const box = document.getElementById("box");
  box.style.visibility = "hidden";
// box.style.display = "none";
</script>
```

### Task

Compare the two behaviors.

---

## Practice 5 — Read and write carefully

```html
<div id="box" style="width:100px;">Hello</div>

<script>
  const box = document.getElementById("box");
  const width = box.offsetWidth;
  box.style.width = width + 50 + "px";
</script>
```

### Think

Why is batching reads and writes better?

---

# 38) Mini Practical Projects

## Project 1 — Expandable Sidebar

Create sidebar open/close behavior and identify which changes trigger reflow.

## Project 2 — Theme Switcher

Toggle dark mode and note whether changes are repaint-only or also layout-related.

## Project 3 — Todo App

Add and remove list items dynamically and observe layout effects.

## Project 4 — Animated Box

Compare width animation vs transform animation.

## Project 5 — Validation Form

Show/hide validation messages and inspect how layout changes.

---

# 39) Assignment

## Part A — Concept Clarity

Write in your own words:

1. What is reflow?
2. What is repaint?
3. Why is reflow more expensive?
4. Why does reflow often cause repaint?
5. What is layout thrashing?
6. Why is it bad?
7. Difference between `display: none` and `visibility: hidden`
8. Which CSS properties are safer for smooth animation?
9. Why should DOM updates be batched?
10. How do reflow and repaint affect user experience?

---

## Part B — Coding Tasks

1. Create one example that triggers repaint only
2. Create one example that triggers reflow
3. Add an element dynamically to a list
4. Change an element’s width and observe effect
5. Compare animation using `left` and `transform`

---

## Part C — Real-World Thinking

Choose whether the following is more related to reflow, repaint, or both:

1. changing text color
2. changing card width
3. adding a new form field
4. switching to dark mode colors only
5. hiding sidebar with `display: none`
6. changing font size
7. changing button background
8. moving element with layout-based positioning
9. applying `transform: translateX(...)`
10. appending new chat messages

Explain why.

---

# 40) Final Beginner-Friendly Summary

## Main idea

* **Reflow** = browser recalculates layout
* **Repaint** = browser redraws appearance

## Most important rule

* reflow is heavier
* reflow often causes repaint
* repaint does not always cause reflow

## Easy memory trick

Think:

* **shape/space changed?** → reflow
* **only look changed?** → repaint

## Best learning order

Learn in this order:

1. DOM and CSSOM
2. render tree
3. layout calculation
4. paint
5. reflow
6. repaint
7. performance impact
8. layout thrashing
9. animation optimization


