# Enterprise Frontend Architecture - Structured Demo

This is a beginner-friendly React project showing a simple enterprise-style frontend structure.

## Architecture
- **Service layer**: API/data fetching
- **Hook layer**: state + business logic
- **UI layer**: reusable presentational components
- **Page layer**: connects everything

## Run
```bash
npm install
npm start
```

## Project Structure
```text
src/
  features/
    products/
      ProductPage.js
      ProductList.js
      ProductService.js
      useProducts.js
  shared/
    Loader.js
    ErrorMessage.js
  App.js
  index.js
  styles.css
```
