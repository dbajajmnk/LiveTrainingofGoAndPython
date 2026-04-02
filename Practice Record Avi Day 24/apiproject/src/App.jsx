import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [prompt, setPrompt] = useState("")
  const [validationError,setValidationError]=useState('');
  const handleInput=(e)=>{setValidationError("")}
  const onSubmit=(e)=>{
    e.preventDefault();
    if(e.target.value){}

  }

  return (
    <>
      <h1>Welcome to our team app</h1>
      <form>
        <input type="text" placeholder='What is in your mind?' value={prompt}  onChange={handleInput}/>
        {validationError? <h2>{validationError}</h2>:null}
        <button type='submit' disabled={validationError}>Submit</button>
      </form>
    </>
  )
}

export default App
