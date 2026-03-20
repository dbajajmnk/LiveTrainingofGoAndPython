import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";
import { useItems } from "./hooks/useItems";

export default function App() {
  const {
    items,
    formData,
    isEditing,
    handleChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    handleCancel
  } = useItems();

  return (
    <div className="page">
      <div className="container-card">
        <h1>CRUD of Array with React + Vite</h1>
        <p className="muted">
          This demo uses only React state and an in-memory array to explain
          Create, Read, Update, and Delete operations.
        </p>

        <div className="concept-box">
          <p><strong>Create:</strong> Add a new student</p>
          <p><strong>Read:</strong> Show all students</p>
          <p><strong>Update:</strong> Edit an existing student</p>
          <p><strong>Delete:</strong> Remove a student</p>
        </div>

        <ItemForm
          formData={formData}
          isEditing={isEditing}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />

        <ItemList
          items={items}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
