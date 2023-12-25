import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './AdminLogin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const history = useHistory();

  const handleLogin = async () => {
    // Implement login logic here using fetch or Axios to call your login API
    const response = await fetch('http://localhost:5000/User/Login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Email: email, Password: password }),
    });

    if (response.ok) {
      const data = await response.json();
      const { user, token } = data;

      // Check if the logged-in user has the Admin role
      if (user.Role === 'Admin') {
        // Save the token to localStorage or sessionStorage
        localStorage.setItem('token', token);
        // Redirect to AddStudentForm after successful login
        history.push('/add-student');
      } else {
        setLoginMessage('Invalid user role');
      }
    } else {
      setLoginMessage('Invalid credentials');
    }
  };

  return (
    <div className="container03">
      <h2>Admin Login</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button onClick={handleLogin}>Login</button>
        {loginMessage && <p>{loginMessage}</p>}
      </form>
    </div>
  );
};

export default AdminLogin;
