import { useState } from "react"

export const Counter = ()=>{
    const [count,setCounter]=useState(0);

    function countHandler(){
        setCounter(count+1)
    }

    return (<>
    <h1>{count}</h1>
    <button onClick={countHandler}>Count</button>
    </>)
}