<<<<<<< HEAD
import React from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="login-wrapper">
      <header>
        <div className="logo">ClassLink</div>
        <div className="nav">
          <a href="#">home</a>
        </div>
      </header>

      <div className="container">
        <h1>Login</h1>
        <form>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />

          <button type="submit">Login</button>
        </form>
        <div className="toggle" onClick={() => navigate('/signup')}>
          Don't have an account? <strong>SIGNUP!</strong>
        </div>
      </div>
    </div>
  );
}
=======
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "", 
    password: ""
  });
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState('');

  // If user is already logged in, redirects to home instead of signing in again
  useEffect(() => {
    const user = localStorage.getItem("userName");

    if(user)
        navigate("/home");
  }, [navigate]);

  const handleLogin = async (e) => {

    try {
      const response = await axios.post("http://localhost:5000/login", form);      

      if (form.username && form.password) {
        // Saves first name for welcome message
        const name = response.data.firstName;

        localStorage.setItem("firstName", name);
        localStorage.setItem("userName", form.username);
        //navigate('/userform');
        navigate("/home");

    } else {
      alert('Please enter username and password.');
    }
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
    
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <input 
        placeholder="Username" 
        value={form.username} 
        onChange={(e) => setForm({...form, username: e.target.value})} 
        required 
        />
      <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} required />
      <button onClick={handleLogin}>Login</button>
      <p className="switch-text">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
}

export default Login;
>>>>>>> origin/beforemain
