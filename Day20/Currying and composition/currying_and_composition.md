# Currying & Function Composition — JavaScript (Real-World Systems)

---

# 1) What is Currying?

Currying is a technique where a function with multiple arguments is converted into a chain of functions, each taking one argument.

```javascript
function add(a){
  return function(b){
    return function(c){
      return a + b + c;
    }
  }
}

console.log(add(1)(2)(3)); // 6
```

---

# 2) What is Function Composition?

Function Composition means combining multiple functions so that the output of one becomes input of another.

```javascript
const add2 = x => x + 2;
const multiply3 = x => x * 3;

console.log(multiply3(add2(5))); // 21
```

---

# 3) Why do we need them?

- Reusability
- Clean modular code
- Functional pipelines
- Avoid duplication

---

# 4) When to use?

Currying:
- Partial application
- Configurable functions

Composition:
- Data transformation pipelines
- Middleware systems

---

# 5) Real-Life Analogy

Currying = Custom food order steps  
Composition = Assembly line process  

---

# 6) Engineering View

Break complex logic into small reusable pieces and chain them.

---

# 7) Syntax

```javascript
const multiply = x => y => x * y;

const compose = (f,g) => x => f(g(x));
```

---

# 8) Real-World Use Cases

- API builders
- Discount engines
- Data pipelines
- Validation systems

---

# 9) Common Mistakes

- Confusing curry with normal function
- Wrong order in composition
- Forgetting return

---

# 10) Deep Concepts

- Currying uses closures
- Composition = function chaining

---

# 11) 50 MCQs

1. Currying means:
A. Splitting function into chain
B. Loop
C. Object
D. Array

2. Composition means:
A. Combining functions
B. Sorting
C. Loop
D. Parsing

3. add(1)(2)(3) is:
A. Loop
B. Currying
C. Object
D. Array

4. compose(f,g)(x) =
A. g(f(x))
B. f(g(x))
C. x
D. null

5. Currying uses:
A. Closure
B. CSS
C. HTML
D. DOM

6. Composition uses:
A. Functions
B. Arrays
C. Objects
D. CSS

7. Currying helps:
A. Reusability
B. Styling
C. Parsing
D. DOM

8. Composition helps:
A. Pipeline
B. Loop
C. Array
D. CSS

9. Currying returns:
A. Function
B. Object
C. Array
D. String

10. Composition returns:
A. Function
B. Loop
C. Object
D. Array

11. Currying splits:
A. Arguments
B. Arrays
C. Objects
D. DOM

12. Composition chains:
A. Functions
B. Objects
C. Arrays
D. CSS

13. Curry example uses:
A. Nested functions
B. Loops
C. Objects
D. DOM

14. Composition order matters:
A. Yes
B. No
C. Sometimes
D. Never

15. Currying uses closure:
A. Yes
B. No
C. Maybe
D. Rarely

16. compose(f,g) means:
A. f(g(x))
B. g(f(x))
C. x
D. null

17. Currying supports:
A. Partial application
B. Loop
C. CSS
D. HTML

18. Composition supports:
A. Data flow
B. Loop
C. CSS
D. DOM

19. Currying returns:
A. Function
B. Object
C. Array
D. Number

20. Composition combines:
A. Functions
B. Strings
C. Arrays
D. DOM

21. Currying is used in:
A. FP
B. CSS
C. HTML
D. DOM

22. Composition used in:
A. Pipelines
B. CSS
C. HTML
D. DOM

23. Currying avoids:
A. Duplication
B. Loop
C. CSS
D. DOM

24. Composition avoids:
A. Nested logic
B. CSS
C. HTML
D. DOM

25. Currying uses:
A. Closure
B. Loop
C. CSS
D. DOM

26. Composition order:
A. Important
B. Not important
C. Random
D. Static

27. Currying improves:
A. Flexibility
B. CSS
C. DOM
D. HTML

28. Composition improves:
A. Readability
B. CSS
C. DOM
D. HTML

29. Currying splits:
A. Arguments
B. Arrays
C. Objects
D. DOM

30. Composition chains:
A. Functions
B. Arrays
C. Objects
D. CSS

31. Currying returns:
A. Function
B. Array
C. Object
D. DOM

32. Composition returns:
A. Function
B. Loop
C. Object
D. Array

33. Currying is:
A. Functional technique
B. CSS
C. HTML
D. DOM

34. Composition is:
A. Functional technique
B. CSS
C. HTML
D. DOM

35. Currying supports:
A. Reuse
B. CSS
C. HTML
D. DOM

36. Composition supports:
A. Pipeline
B. CSS
C. HTML
D. DOM

37. Currying is:
A. Chain
B. Loop
C. Object
D. DOM

38. Composition is:
A. Combine
B. Loop
C. Object
D. DOM

39. Currying works with:
A. Functions
B. CSS
C. HTML
D. DOM

40. Composition works with:
A. Functions
B. CSS
C. HTML
D. DOM

41. Currying example:
A. add(1)(2)
B. add(1,2)
C. loop
D. array

42. Composition example:
A. f(g(x))
B. loop
C. array
D. object

43. Currying uses:
A. Closure
B. CSS
C. DOM
D. HTML

44. Composition uses:
A. Function chaining
B. CSS
C. DOM
D. HTML

45. Currying splits args:
A. Yes
B. No
C. Maybe
D. Rare

46. Composition merges:
A. Functions
B. CSS
C. DOM
D. HTML

47. Currying returns function:
A. Yes
B. No
C. Maybe
D. Rare

48. Composition returns function:
A. Yes
B. No
C. Maybe
D. Rare

49. Currying is useful:
A. Yes
B. No
C. Maybe
D. Rare

50. Composition is useful:
A. Yes
B. No
C. Maybe
D. Rare

---

# 12) Answer Key

1-A 2-A 3-B 4-B 5-A  
6-A 7-A 8-A 9-A 10-A  
11-A 12-A 13-A 14-A 15-A  
16-A 17-A 18-A 19-A 20-A  
21-A 22-A 23-A 24-A 25-A  
26-A 27-A 28-A 29-A 30-A  
31-A 32-A 33-A 34-A 35-A  
36-A 37-A 38-A 39-A 40-A  
41-A 42-A 43-A 44-A 45-A  
46-A 47-A 48-A 49-A 50-A  

---

# 13) Subjective Q&A

Q1: What is currying?  
A: Transforming a multi-argument function into chained single-argument functions.

Q2: What is composition?  
A: Combining functions into pipelines.

---

# 14) Assignments

- Build curry function
- Build compose
- Build pipe

---

# 15) Mini Projects

- Validation pipeline
- API builder
- Discount engine

---

# 16) Interview Notes

- Currying vs composition
- Implementation questions

---

# 17) Summary

Currying and composition enable modular, reusable, and scalable functional programming.
