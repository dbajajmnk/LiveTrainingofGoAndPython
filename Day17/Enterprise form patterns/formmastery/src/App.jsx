import { useState } from 'react'
import './App.css'

const TextField = ({ lbl, name, value, handleChange, type = "text", error }) => {
  return (
    <div className="form-group" style={{ marginBottom: '15px' }}>
      <label style={{ display: 'block', fontWeight: 'bold' }}>{lbl}</label>
      <input 
        type={type} 
        name={name} 
        value={value} 
        onChange={handleChange} 
        style={{ borderColor: error ? 'red' : '#ccc', padding: '8px', width: '100%' }}
      />
      {error && <span style={{ color: 'red', fontSize: '12px' }}>{error}</span>}
    </div>
  )
}

function App() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let validationErrors = {};

    if (!form.email.includes("@")) {
      validationErrors.email = "Please enter a valid email address.";
    } 
    
    if (form.password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      console.log("Login Failed:", validationErrors);
    } else {
      setErrors({});
      console.log("Login Success! Data:", form);
      alert("Welcome! Logging you in...");
    }
  }

  return (
    <div style={{ maxWidth: '300px', margin: '50px auto', padding: '20px', border: '1px solid #ddd' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <TextField 
          lbl="Email" 
          name="email" 
          value={form.email} 
          handleChange={handleChange} 
          error={errors.email}
        />
        
        <TextField 
          lbl="Password" 
          name="password" 
          value={form.password} 
          handleChange={handleChange} 
          type="password" 
          error={errors.password}
        />

        <button type="submit" style={{ width: '100%', padding: '10px', cursor: 'pointer' }}>
          Login
        </button>
      </form>
    </div>
  )
}

export default App
