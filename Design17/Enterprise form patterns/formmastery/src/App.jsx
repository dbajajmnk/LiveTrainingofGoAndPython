import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { TextField } from './Components/TextField'

const formState = {
  data:{
    email:"",
    password:""
  },
  error:{
    email:"",
    password:""
  }
}

function App() {
  const [form, setForm] = useState(formState.data)
  const [error,setErrors]= useState(formState.error)

  const handleChange=(event)=>{
    const {name,value}= event.target;
    console.log("Name ",name);
    console.log("value",value);
    setForm((pre)=>(
      {
      ...pre,
      [name]:value
    }))
    console.log(form)
    
  }

  const validateFields = ()=>{
    const validationError= error
    if (form.email==""){
      validationError.email="Sorry Invalid Email"; 
    }
    else if (form.password==""){
      validationError.password="Sorry Invalid Password";
    }
    return validationError;
  }

   const handleSubmit=(event)=>{
    event.preventDefault();
    const  errors = validateFields();
    if (Object.keys(errors).length>0)
    {
      setErrors(errors)
      return ;
    }
    else
    {
       console.log(form)
    }
   
    
  }

  return (<form onSubmit={handleSubmit}>
   <TextField lbl="Enter Eamil" form={form} handleChange={handleChange}field="email" error={error.email}></TextField>
    <TextField lbl="Enter Password" form={form} handleChange={handleChange} field="password" error={error.password}></TextField>
    <button type="submit">Submit</button>
  </form>
    
  )
}

export default App
