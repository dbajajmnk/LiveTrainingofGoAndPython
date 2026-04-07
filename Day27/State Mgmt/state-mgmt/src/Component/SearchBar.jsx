import React, { useState } from "react";

function SearchBar({ searchText, setSearchText }) {
  return (
    <input
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      placeholder="Search..."
    />
  );
}

function SearchResult({ searchText }) {
  return <p>Searching for: {searchText}</p>;
}

export default function SearchPage() {
  const [searchText, setSearchText] = useState("");

  return (
    <div>
      <SearchBar searchText={searchText} setSearchText={setSearchText} />
      <SearchResult searchText={searchText} />
    </div>
  );
}