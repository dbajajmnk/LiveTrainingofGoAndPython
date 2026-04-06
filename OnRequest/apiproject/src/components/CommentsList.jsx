import { useEffect, useState } from "react";
import { getData } from "../services/PostService";

export function Comments() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function loadCourses() {
      const data = await getData("https://jsonplaceholder.typicode.com/comments");
      setComments(data);
    }

    loadCourses();
  }, []);

  return (<>{comments.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}</>);
}