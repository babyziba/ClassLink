import React, { useState } from 'react';
import '../App.css';

function UserForm() {
  const [courses, setCourses] = useState('');
  const [interests, setInterests] = useState('');
  const [campusTime, setCampusTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Courses: ${courses}\nInterests: ${interests}\nCampus Time: ${campusTime}`);
  };

  return (
    <div className="form-container">
      <h2>Tell us about you</h2>
      <form onSubmit={handleSubmit}>
        <label>Courses</label>
        <input value={courses} onChange={(e) => setCourses(e.target.value)} />

        <label>Interests</label>
        <input value={interests} onChange={(e) => setInterests(e.target.value)} />

        <label>When are you on campus</label>
        <input value={campusTime} onChange={(e) => setCampusTime(e.target.value)} />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UserForm;
