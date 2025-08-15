import React, { useState } from 'react';
import './signup.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function Signup() {
  const [currentForm, setCurrentForm] = useState('signup');
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    courses: [],
    interests: []
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    form.courses = form.courses.split(", ");
    form.interests = form.interests.split(", ");

    try {
      const response = await axios.post("http://localhost:5000/signup", form);

      localStorage.setItem("email", form.email);
      navigate("/home");
    } catch (error) {
      alert(error.respone?.data?.message || "Something went wrong");
    }
  }

  return (
    <div>
      <header>
        <div className="logo">ClassLink</div>
        <title>ClassLink | Sign Up</title>
      </header>

      {currentForm === 'signup' && (
        <div className="container">
          <h1>Sign Up</h1>
          <form>

            <label type="firstName">First Name</label>
            <input type="firstName" id="firstName" name="firstName" onChange={handleChange} required/>

            <label type="lastName">Last Name</label>
            <input type="lastName" id="lastName" name="lastName" onChange={handleChange} required/>


            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" onChange={handleChange} required/>

            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" onChange={handleChange} required/>

            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" onChange={handleChange} required/>

            <button type="submit" onClick={() => setCurrentForm('form')}>Next</button>
          </form>
          <div className="toggle" onClick={() => navigate('/login')}>
               Already have an account? <strong>LOGIN!</strong>
          </div>
        </div>
      )}

      {currentForm === 'form' && (
        <div className="container">
          <h1>Tell us about you</h1>
          <form>
            <label htmlFor="courses">Courses</label>
            <input type="text" id="courses" name="courses" onChange={handleChange}/>

            <label htmlFor="interests">Interests</label>
            <input type="text" id="interests" name="interests" onChange={handleChange}/>

            <button type="submit" onClick={handleSubmit}>Submit</button>
          </form>
          <div className="toggle" onClick={() => setCurrentForm('signup')}>
            Back
          </div>
        </div>
      )}
    </div>
  );
}
