import React, { useState } from 'react';
import './Login.css';  // Ensure you import the CSS file

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username && password) {
 
// Simulating a successful login, you can replace this with actual API call
      setUser({ username });
      console.log(`User ${username} logged in`);
    } else {
      alert('Please enter username and password');
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