import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '', email: '', birthday: '', password: '', confirm: ''
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const respone = await axios.post("http://localhost:5000/signup", form);

      // To keep user signed in
      localStorage.setItem("username", form.username);



      if (form.password !== form.confirm) {
      alert("Passwords don't match.");
    } else {
      alert("Signup successful!");
      navigate('/login');
    }

    } catch (error) {

    }
    
  };

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} />
        <input name="birthday" type="date" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} />
        <input name="confirm" type="password" placeholder="Confirm Password" onChange={handleChange} />
        <button type="submit">Sign Up</button>
      </form>
      <p className="switch-text">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Signup;
