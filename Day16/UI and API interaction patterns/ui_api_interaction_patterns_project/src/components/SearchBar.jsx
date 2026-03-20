export default function SearchBar({ value, onChange, onSearch, disabled }) {
  return (
    <div className="toolbar">
      <input
        className="input"
        type="text"
        placeholder="Search products..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      <button className="button" onClick={onSearch} disabled={disabled}>
        Search
      </button>
    </div>
  );
}
