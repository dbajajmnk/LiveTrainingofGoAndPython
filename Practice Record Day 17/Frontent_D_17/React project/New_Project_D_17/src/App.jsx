// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//     const handleForm=(event)=>{
//     // event.preventDefault();
//     const [name,value]=event.target;
//     setForm((pre)=>({...pre,[name]:value}))
//   }

//   const handleChange=(event)=>{
//     // event.preventDefault();
//     const [name,value]=event.target;
//     setForm((pre)=>({...pre,[name]:value}))
//   }

//     const handleSubmit =(event)=>{
//     event.preventDefault();
//     // const [name,value]=event.target;
//     // setForm((pre)=>({...pre,[name]:value}))
//     console.log(form);
    
//   }

//   return (
//     <form onSubmit={handleForm}>
//       <label htmlFor="email">Enter Mail</label>
//       <input type="text" name="email" />
//       <label htmlFor="lblpassword">Enter Password</label>
//       <input type="text" name="password"  />
//       <button type='submit' onClick={handleChange}>Submit</button>
//     </form>

//   )
// }

// export default App

import React, { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);

    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Register</h2>

        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;