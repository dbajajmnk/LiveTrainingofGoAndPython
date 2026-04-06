import { useEffect, useState } from "react";
import { getComments } from "../services/PostService";

export function Comments() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function loadCourses() {
      const data = await getComments("https://jsonplaceholder.typicode.com/comments");
      setComments(await data.json());
    }

    loadCourses();
  }, []);

  return (<>{comments.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}</>);
}