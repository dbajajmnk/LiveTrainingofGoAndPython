import { useEffect, useState } from "react";
import { getData } from "../services/PostService";
import { AppConstants } from "../util/AppConstants";
export function Comments() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function loadCourses() {
      const data = await getData(AppConstants.apiEndPoints.comments);
      setComments(data);
    }

    loadCourses();
  }, []);

  return (<>{comments.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}</>);
}