import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);

  const handleLogin = async () => {
    if (username && password) {
      try {
        const response = await axios.post('http://127.0.0.1:5000/api/login', {
          username,
          password,
        });

        if (response.status === 200) {
          setUser({ username });
          console.log(`User ${username} logged in`);
          fetchUsers();  // Fetch users after a successful login
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred during login');
      }
    } else {
      alert('Please enter username and password');
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/users');
      if (response.status === 200) {
        setUsers(response.data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Login / Signup</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Sign Up / Login</button>
      </div>
    </div>
  );
};

export default Login;
