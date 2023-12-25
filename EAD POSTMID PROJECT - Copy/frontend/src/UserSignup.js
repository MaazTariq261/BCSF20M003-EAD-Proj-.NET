import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './UserSignup.css';


const UserSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const history = useHistory();

  const handleSignup = async () => {
    // Implement signup logic here using fetch or Axios to call your signup API
    const response = await fetch('http://localhost:5000/User/Register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Email: email, Password: password, Role: 'User' }),
    });

    if (response.ok) {
      const data = await response.json();
      const { user, token } = data;

      // Save the token to localStorage or sessionStorage
      localStorage.setItem('token', token);
      // Redirect to StudentList after successful signup
      history.push('/studentlist');
    } else {
      setLoginMessage('Failed to sign up');
    }
  };

  return (
    <div className="container">
      <h2>User SignUp</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <label>Role</label>
          <input type="text" value="User" readOnly disabled />
        </div>
        <button onClick={handleSignup}>Sign Up</button>
        {loginMessage && <p>{loginMessage}</p>}
      </form>
    </div>
  );
};

export default UserSignup;
