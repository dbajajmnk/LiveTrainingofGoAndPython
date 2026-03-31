import { useState } from 'react'

import './App.css'

function App() {
  const [name, setName] = useState('');
  const [names, setNames] = useState([]);
  const handleSubmit = (event) => {
    event.preventDefault();
    setNames([...names, name]);
    setName('');

  }
  const handleDelete = (index) => {
    const newNames = names.filter((item, i) => i !== index);
    setNames(newNames);
  }
  const handleSelectedIndex = (index) => {
    const selectedName = names[index];
    setName(selectedName);
    updateIndex(index);

  }
  function updateIndex(index) {
    names[index] = name;
    setNames([...names]);
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
      <button type='submit'>Submit</button>
    </form>
    <ul>
      {names.map((item, index) => (
        <li key={index}>{item}
        <button onClick={() => handleDelete(index)}>Delete</button>
        <button onClick={() => handleSelectedIndex(index)}>Edit</button></li>
      ))}
    </ul>
    </>
  )
}

export default App
   
