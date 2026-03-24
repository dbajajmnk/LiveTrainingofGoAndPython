export const TextField = ({ lbl, name, value, handleChange, type = "text" }) => {
  return (
    <div className="form-group">
      <label>{lbl}</label>
      <input 
        type={type} 
        name={name} 
        value={value} 
        onChange={handleChange} 
      />
    </div>
  );
};
