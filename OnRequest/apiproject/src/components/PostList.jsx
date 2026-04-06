import React, { useState } from "react";
import {getData} from "../services/PostService.js";

export default function PostList({url}) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadUsers(url) {
    try {
      setLoading(true);
      setError("");
      const response = await getData(url);
      console.log("Data",response);
      setUsers(response);
    } catch (err) {
      setError("Could not load users. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button onClick={()=>loadUsers(url)}>Load Users</button>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {users.map((user) => (
        <div key={user.id}>{user.title}</div>
      ))}
    </div>
  );
}