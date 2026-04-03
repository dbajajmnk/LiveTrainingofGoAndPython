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

import { useState } from "react";
import { loginUser } from "../services/authservice";
import { validateLogin } from "../utils/authValidation";
import { saveToken } from "../utils/tokenStorage";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleLogin() {
    const validationMessage = validateLogin(email, password);

    if (validationMessage) {
      setMessage(validationMessage);
      return;
    }

    const data = await loginUser({ email, password });

    if (data.token) {
      saveToken(data.token);
      setMessage("Login successful");
    } else {
      setMessage("Login failed");
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <p>{message}</p>
    </div>
  );
}