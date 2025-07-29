import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '', email: '', birthday: '', password: '', confirm: ''
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      alert("Passwords don't match.");
    } else {
      alert("Signup successful!");
      navigate('/');
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
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
}

export default Signup;
