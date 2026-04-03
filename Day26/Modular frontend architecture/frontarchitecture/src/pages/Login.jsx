// import React, { useState } from "react";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");

//   async function handleLogin() {
//     if (!email.includes("@")) {
//       setMessage("Invalid email");
//       return;
//     }

//     if (password.length < 6) {
//       setMessage("Password too short");
//       return;
//     }

//     const response = await fetch("/api/login", {
//       method: "POST",
//       body: JSON.stringify({ email, password }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     const data = await response.json();

//     localStorage.setItem("token", data.token);

//     if (data.token) {
//       setMessage("Login successful");
//     } else {
//       setMessage("Login failed");
//     }
//   }

//   return (
//     <div>
//       <h1>Login</h1>
//       <input value={email} onChange={(e) => setEmail(e.target.value)} />
//       <input value={password} onChange={(e) => setPassword(e.target.value)} />
//       <button onClick={handleLogin}>Login</button>
//       <p>{message}</p>
//     </div>
//   );
// }
import {useState} from 'react'
import {validateLogin} from '../utils/authValidation'
import { UI_CONSTANTS } from '../Compontent/UI_Constants';
import {loginUser} from '../services/authservice'
import { TextField } from '../Compontent/Container/App_TextField';

export default function loginPage() {
const [form, setForm] = useState({email:"",password:""});
const [message,setMessage]=useState('');


const formHandler=(e) =>{

    console.log(e.target);
    console.log(e.target.value);
    setForm({...form,[e.target.name]:e.target.value})
}


async function handleLogin(event) {
    event.preventDefault();
    const validationMessage = validateLogin({...form});
``
    if (validationMessage) {
      setMessage(validationMessage);
      return;
    }

    const data = await loginUser({...form});

    if (data.token) {
      saveToken(data.token);
      setMessage(UI_CONSTANTS.validtionMessages.loginSuccessful);
    } else {
      setMessage(UI_CONSTANTS.validtionMessages.loginFailed);
    }
  }
  return (
    <div>
      <h1>{UI_CONSTANTS.placeHolder.login}</h1>
      <form onSubmit={async(e)=>handleLogin(e)}>
      <TextField value={form.email} onChange={formHandler} name={UI_CONSTANTS.names.email} />
      <TextField value={form.password} onChange={formHandler} name={UI_CONSTANTS.names.password} />
      <button type="submit">{UI_CONSTANTS.placeHolder.login}</button>
      <p>{message}</p>
      </form>
    </div>
  );
}