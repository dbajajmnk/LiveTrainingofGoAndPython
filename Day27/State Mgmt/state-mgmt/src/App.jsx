import React, { useState, useEffect } from "react";
import Counter from './Component/Counter';
import CounterReducer from './Component/CounterReducer';
import { getPost } from './api'; 
import './App.css';

function SearchBar({ searchText, setSearchText }) {
  return (
    <input
      className="search-input"
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      placeholder="Search..."
    />
  );
}

function SearchResult({ searchText }) {
  return <p>Searching for: <strong>{searchText}</strong></p>;
}

function App() {
  const [searchText, setSearchText] = useState("");
  const [apiData, setApiData] = useState(null);

  // Example of calling your API function on mount
  useEffect(() => {
    async function checkApiCall() {
      try {
        // Ensure this matches your api.js export name (getPost vs getPosts)
        const response = await getPost("https://typicode.com");
        // If your getPost uses fetch internally, you might need: const data = await response.json();
        setApiData(response);
      } catch (e) {
        setApiData({
          "message": "Api failed with Error",
          "status": "failed",
          "code": e.message
        });
      }
    }
    checkApiCall();
  }, []);

  return (
    <main>
      <section id="center">
        <h1>My App</h1>

        <div className="search-container">
          <SearchBar searchText={searchText} setSearchText={setSearchText} />
          <SearchResult searchText={searchText} />
        </div>

        {apiData && (
          <div className="api-status">
            <small>API Status: {apiData.status || "Success"}</small>
          </div>
        )}

        <hr />
        <Counter />
        <hr />
        <CounterReducer />
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <p>Ready to build something cool.</p>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </main>
  );
}

export default App;
