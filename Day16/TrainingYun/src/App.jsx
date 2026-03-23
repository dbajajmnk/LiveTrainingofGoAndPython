import { useState } from "react";
import { ProductForm } from "./Feature/Course/CourseForm";
 
function App() {


  return<ProductForm handlers={[handler1,handler2,handler3,handler4]}></ProductForm>
  const colors = ["red", "blue", "green", "orange"];
  const [index, setIndex] = useState(0);
 
  function changeColor() {
    setIndex((prev) => (prev + 1) % colors.length);
  }
 
  return (
<>
<h1>My first compo</h1>
 
      <button
        onClick={changeColor}
        style={{
          backgroundColor: colors[index],
          padding: "10px",
          color: "white",
          border: "none",
        }}
>
        Click me
</button>
 
      <h2> color: {colors[index]}</h2>
</>
  );
}
 
export default App;