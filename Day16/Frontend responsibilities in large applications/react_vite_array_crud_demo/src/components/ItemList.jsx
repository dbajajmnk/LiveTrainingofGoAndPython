export default function ItemList({ items, onEdit, onDelete }) {
  return (
    <div className="list-card">
      <h2>Student List (Read)</h2>

      {items.length === 0 ? (
        <p className="muted">No students available.</p>
      ) : (
        <div className="grid">
          {items.map((item) => (
            <div key={item.id} className="student-card">
              <h3>{item.name}</h3>
              <p><strong>Course:</strong> {item.course}</p>
              <p><strong>Status:</strong> {item.status}</p>

              <div className="button-row">
                <button className="button small" onClick={() => onEdit(item)}>
                  Edit
                </button>
                <button
                  className="button small danger"
                  onClick={() => onDelete(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
