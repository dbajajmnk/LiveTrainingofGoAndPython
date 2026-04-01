import { useState } from 'react'
import './App.css'

function App() {
  const [name, setName] = useState('');
  const [names, setNames] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name.trim()) return;

    if (editingIndex !== null) {
      const updatedNames = [...names];
      updatedNames[editingIndex] = name;
      setNames(updatedNames);
      setEditingIndex(null);
    } else {
      setNames([...names, name]);
    }
    setName('');
  }

  const handleEdit = (index) => {
    setName(names[index]);
    setEditingIndex(index);
  }

  const handleDelete = (index) => {
    setNames(names.filter((_, i) => i !== index));
    if (editingIndex === index) {
      setEditingIndex(null);
      setName('');
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder='Enter your name' 
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <button type="submit">{editingIndex !== null ? 'Update' : 'Submit'}</button>
      </form>

      <ul>
        {names.map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={() => handleEdit(index)}>Edit</button>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
