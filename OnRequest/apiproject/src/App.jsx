import { useState } from 'react'
import './App.css'
import {Counter} from './components/Counter'
import { SearchText } from './components/SeachText';
import { SearchBar } from './components/SearchBar';
import PostList from './components/PostList';

function App() {
  const [prompt, setPrompt] = useState('')
  const [validationError, setValidationError] = useState('');
  const [searchText,setSearchText]=useState();


  const handleInput = (e) =>{ 
    setPrompt(e.target.value);
    if(prompt.length >5) {
      setValidationError("");
    } 

  }
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(prompt);
    if(prompt.length < 5) {
      setValidationError('Prompt must be at least 5 characters long');
      setPrompt('');
    }
    else{
      setValidationError('');
      callApi('http://localhost:5000/api/generate', {prompt});
      }
  }
  const callApi = (url,data)=>{
      console.log("Calling API with data: ",url, data);
  }

  return (
    <>
    <h1>Welcome to Our Team app</h1>
    <Counter></Counter>
    <PostList url="https://jsonplaceholder.typicode.com/posts"></PostList>
    <SearchBar searchText={searchText} setSearchText={setSearchText}/>
    <SearchText searchText={searchText}/>
     <form onSubmit={onSubmit}>
      <input type="text" name="userinput" placeholder="What is in your mind?" value={prompt} onChange={handleInput}/>
      {validationError ? <h2>{validationError}</h2> : null}
      <button type="submit" disabled={validationError}>Submit</button>
     </form>
    </>
  )
}

export default App
