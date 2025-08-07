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
      </header>

      {currentForm === 'signup' && (
        <div className="container">
          <h1>Sign Up</h1>
          <form>

            <label type="firstName">First Name</label>
            <input type="firstName" id="firstName" name="firstName" required/>

            <label type="lastName">Last Name</label>
            <input type="lastName" id="lastName" name="lastName" required/>


            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required/>

            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required/>

            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" required/>

            <button type="submit" onClick={() => setCurrentForm('form')}>Next</button>
          </form>
        </div>
      )}

      {currentForm === 'form' && (
        <div className="container">
          <h1>Tell us about you</h1>
          <form>
            <label htmlFor="courses">Courses</label>
            <input type="text" id="courses" name="courses" />

            <label htmlFor="interests">Interests</label>
            <input type="text" id="interests" name="interests" />

            <label htmlFor="onCampus">When are you on campus</label>
            <input type="text" id="onCampus" name="onCampus" />

            <button type="submit">Submit</button>
          </form>
          <div className="toggle" onClick={() => setCurrentForm('signup')}>
            Back
          </div>
        </div>
      )}
    </div>
  );
}
