import React, { useState, useEffect} from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    email: '', password: ''
  });
   // If user is already logged in, redirects to home instead of signing in again
  useEffect(() => {
    const user = localStorage.getItem("email");

    if(user)
        navigate("/home");
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/login", form);      

      if (form.email && form.password) {
        // Saves first name for welcome message
        const name = response.data.firstName;

        localStorage.setItem("firstName", name);
        localStorage.setItem("email", form.email);
        navigate("/home");

    } else {
      alert('Please enter email and password.');
    }
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
    
  };

  return (
    <div className="login-wrapper">
      <header>
        <title>ClassLink | Login</title>
        <div className="logo">ClassLink</div>
        <div className="nav">
          <a href="#">home</a>
        </div>
      </header>

      <div className="container">
        <h1>Login</h1>
        <form>
          <label htmlFor="username">Email</label>
          <input 
            type="text" 
            id="email" 
            name="email"
            value={form.email}
            onChange={(e) => setForm({...form, email: e.target.value })}
            required
            />

          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            value={form.password}
            onChange={(e) => setForm({...form, password: e.target.value })}
            />

          <button type="submit" onClick={handleLogin}>Login</button>
        </form>
        <div className="toggle" onClick={() => navigate('/signup')}>
          Don't have an account? <strong>SIGNUP!</strong>
        </div>
      </div>
    </div>
  );
}
