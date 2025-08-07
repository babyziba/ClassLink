import React, { useState } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [currentForm, setCurrentForm] = useState('signup');
  const navigate = useNavigate();

  const [form, setForm] = useState({
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

      localStorage.setItem("email", email);
      navigate("/home");
    } catch (error) {
      alert(error.respone?.data?.message || "Something went wrong");
    }
  }

  return (
    <div>
      <header>
        <div className="logo">ClassLink</div>
        <div className="nav">
          <a href="#" onClick={() => setCurrentForm('signup')}>home</a>
          <a href="#" onClick={() => setCurrentForm('form')}>form</a>
        </div>
      </header>

      {currentForm === 'signup' && (
        <div className="container">
          <h1>Sign Up</h1>
          <form>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required/>

            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required/>

            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" required/>

            <button type="submit" onClick={handleSubmit}>Sign Up</button>
          </form>
          <div className="toggle" onClick={() => setCurrentForm('form')}>
            Already signed up? Fill out your info
          </div>
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
            Back to signup
          </div>
        </div>
      )}
    </div>
  );
}
