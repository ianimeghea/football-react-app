import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

/**
 * Component for user login and registration.
 * @param {Object} setUser - Function to set the logged-in user.
 * @returns {JSX.Element} Login form.
 */
const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const handleKeyPress = async (event) => {
    if (event.key === 'Enter') {
      handleAuth();
      
    }
  };
  /**
   * Function to handle user authentication (login or signup).
   * Redirects to home page after successful login.
   * @returns {void}
   */
  const handleAuth = async () => {
    if (username && password) {
      try {
        const url = isLogin ? 'http://127.0.0.1:5000/api/login' : 'http://127.0.0.1:5000/api/register';
        const response = await axios.post(url, { username, password });

        if (response.status === 200) {
          if (isLogin) {
            setUser({ username });
            console.log(`User ${username} logged in`);
            fetchUsers(); // Fetch users after login
            navigate('/'); // Redirect to home after login
          } else {
            alert('User registered successfully');
            setIsLogin(true); // Switch to login after successful signup
          }
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error('Error during authentication:', error);
        alert('An error occurred during authentication');
      }
    } else {
      alert('Please enter username and password');
    }
  };

  /**
   * Function to fetch users from the API.
   * @returns {void}
   */
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
        <h2>{isLogin ? 'Login' : 'Signup'}</h2>
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
          onKeyDown={handleKeyPress}
        />
        <button onClick={handleAuth}>{isLogin ? 'Login' : 'Signup'}</button>
        <p onClick={() => setIsLogin(!isLogin)} className="toggle-auth">
          {isLogin ? 'Create an account' : 'Already have an account? Login'}
        </p>
      </div>
    </div>
  );
};

export default Login;
