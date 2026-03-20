export default function ItemForm({
  formData,
  isEditing,
  onChange,
  onSubmit,
  onCancel
}) {
  return (
    <form className="form-card" onSubmit={onSubmit}>
      <h2>{isEditing ? "Update Student" : "Create Student"}</h2>

      <div className="field-group">
        <label>Name</label>
        <input
          className="input"
          type="text"
          name="name"
          value={formData.name}
          onChange={onChange}
          placeholder="Enter student name"
        />
      </div>

      <div className="field-group">
        <label>Course</label>
        <input
          className="input"
          type="text"
          name="course"
          value={formData.course}
          onChange={onChange}
          placeholder="Enter course name"
        />
      </div>

      <div className="field-group">
        <label>Status</label>
        <select
          className="input"
          name="status"
          value={formData.status}
          onChange={onChange}
        >
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="button-row">
        <button className="button" type="submit">
          {isEditing ? "Update" : "Add"}
        </button>

        {isEditing && (
          <button className="button secondary" type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
