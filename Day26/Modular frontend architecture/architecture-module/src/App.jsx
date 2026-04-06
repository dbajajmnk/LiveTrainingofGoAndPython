import DynamicForm from './assets/Components/DynamicForm.jsx';
import './App.css';

function App() {
  // YOU (THE ADMIN) DEFINE THESE INPUTS HERE
  const adminConfig = [
    { id: 1, type: 'text', label: 'User Name', placeholder: 'Enter username' },
    { id: 2, type: 'email', label: 'User Email', placeholder: 'Enter email' },
    { id: 3, type: 'password', label: 'User Password', placeholder: 'Enter password' }
  ];

  return (
    <div className="container">
      <h1>Admin-Defined User Form</h1>
      <p>The inputs below are generated from the adminConfig array.</p>
      
      {/* Passing the admin's rules to the User's form */}
      <DynamicForm config={adminConfig} />
    </div>
  );
}

export default App;
