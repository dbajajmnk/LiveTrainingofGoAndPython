# UI and API Interaction Patterns Project

Beginner-friendly Vite + React project showing common UI and API interaction patterns.

## Patterns covered
- Fetch on page load
- Fetch on user action
- Loading state
- Error state
- Empty state
- Retry action
- Response transformation
- Separation of files (page, service, hook, components)

## Run
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Structure
```text
src/
  components/
    SearchBar.jsx
    ProductList.jsx
    StatusMessage.jsx
  features/
    products/
      productService.js
      useProducts.js
      ProductsPage.jsx
  App.jsx
  main.jsx
  styles.css
```
