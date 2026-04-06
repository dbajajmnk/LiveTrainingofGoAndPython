import { useState } from 'react';

// This component builds the form based on what the "Admin" (the config prop) says
function DynamicForm({ config }) {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("User Data: " + JSON.stringify(formData, null, 2));
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      {config.map((field) => (
        <div key={field.id} style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>{field.label}</label>
          <input 
            type={field.type} 
            name={field.label} 
            placeholder={field.placeholder} 
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
      ))}
      <button type="submit" className="counter">Submit to Admin</button>
    </form>
  );
}

export default DynamicForm;
