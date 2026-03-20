import { CourseCard } from './Features/Course/Course';
import CourseList from './Features/Course/CourseList';



function App(){
  const fruits = ["Apple","Banana","Mango","Papaya","Kiwi"];
  const  listUI=[];
  fruits.forEach((value,index)=>{
      const litag= <li key={index}>{value}</li>
      listUI[index]=litag
  })

// const courseList=[{title:"Java",discount:10,duration:"2 Months",price:1500},
//   {title:"Java",discount:10,duration:"2 Months",price:1500},
//   {title:"Java",discount:10,duration:"2 Months",price:1500},
//   {title:"Java",discount:10,duration:"2 Months",price:1500},
//   {title:"Java",discount:10,duration:"2 Months",price:1500},
// ]

// return <CourseList items={courseList}></CourseList>
  return <ol>{listUI}</ol>
}
export default App


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

