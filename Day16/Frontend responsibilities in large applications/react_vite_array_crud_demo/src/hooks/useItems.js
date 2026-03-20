import { useState } from "react";

const initialStudents = [
  { id: 1, name: "Deepak", course: "React", status: "Active" },
  { id: 2, name: "Rahul", course: "JavaScript", status: "Pending" }
];

const initialForm = {
  id: null,
  name: "",
  course: "",
  status: "Active"
};

export function useItems() {
  const [items, setItems] = useState(initialStudents);
  const [formData, setFormData] = useState(initialForm);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.name.trim() || !formData.course.trim()) {
      alert("Name and course are required.");
      return;
    }

    if (isEditing) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === formData.id ? { ...formData } : item
        )
      );
      setIsEditing(false);
    } else {
      const newItem = {
        ...formData,
        id: Date.now()
      };
      setItems((prev) => [...prev, newItem]);
    }

    setFormData(initialForm);
  };

  const handleEdit = (item) => {
    setFormData(item);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm("Do you want to delete this item?");
    if (!confirmed) return;

    setItems((prev) => prev.filter((item) => item.id !== id));

    if (isEditing && formData.id === id) {
      setFormData(initialForm);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setFormData(initialForm);
    setIsEditing(false);
  };

  return {
    items,
    formData,
    isEditing,
    handleChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    handleCancel
  };
}
