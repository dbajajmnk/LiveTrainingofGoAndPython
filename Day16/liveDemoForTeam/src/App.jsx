import { CourseCard } from './Features/Course/Course';
import CourseList from './Features/Course/CourseList';
import "./App.css"
import { useState } from 'react';
import ProductForm from './Features/Course/CourseForm';

let [courseTitle,setTitle]= useState("") 
let [courseDuration,setDuraiton]= useState("") 
let [coursePirce,setPrice]= useState("") 
let [discount,setDiscount]= useState("") 

const handler1=(e)=>{
  console.log(e.value);
  setTitle(e.value)

}
const handler2=(e)=>{
console.log(e.value);
setDiscount(e.value)
}
const handler3=(e)=>{
  console.log(e.value);
  setPrice(e.value);
}
const handler4=(e)=>{
  console.log(e.value);
  setDuraiton(e.value)
  
}
const handler5=(e)=>{
  console.log(e.value);
  
}

function App(){

  return <ProductForm handlers={[handler1,handler2,handler3,handler4,handler5]} 
  values={[courseTitle,courseDuration,coursePirce,discount]}></ProductForm> 
}
export default App





function dynamicStylingwithFunction(){
   const styles = ["odd","even"];
  const clickHander=()=>{
     selectedStyle=="odd" ? setSelectedStyle(styles[1]) :setSelectedStyle(styles[0])
  }
  let [selectedStyle,setSelectedStyle] = useState(styles[0])
  return <div className={selectedStyle} onClick={clickHander}></div>
}
function conditionalStyling(){
    let conditionStyling = index%2==0 ? 'even' : "odd";
      const litag= <li key={index} className={conditionStyling}>{value}</li>
      listUI[index]=litag
  }

function ListDemo()
{
  const courseList=[{title:"Java",discount:10,duration:"2 Months",price:1500},
  {title:"Java",discount:10,duration:"2 Months",price:1500},
  {title:"Java",discount:10,duration:"2 Months",price:1500},
  {title:"Java",discount:10,duration:"2 Months",price:1500},
  {title:"Java",discount:10,duration:"2 Months",price:1500},
]

return <CourseList items={courseList}></CourseList>
}

// function ButtonExample(){
//   let  [count,setCounter] = useState(0)
//   function countHandler(){

//     setCounter(previous => previous+1)
//   }
//   let numbertype = count%2==0 ? "Even" : "Odd"
//   return <>
//     <h1>Number is {numbertype}  {count}</h1>
    
//     <ButtonI label="Click" handler={countHandler}></ButtonI>
//      {/* <Button label="Click Me" handler={setCounter(previous => previous+1)}></Button> */}
  
//   </>
// }

