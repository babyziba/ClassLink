import React, { useState } from 'react';
import '../App.css'; 

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [courses, setCourses] = useState('');
  const [interests, setInterests] = useState('');
  const [campusTime, setCampusTime] = useState('');

  const handleLogin = () => {
    if (username && password) {
      setIsLoggedIn(true);
    } else {
      alert('Please enter a username and password.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Courses: ${courses}\nInterests: ${interests}\nOn Campus: ${campusTime}`);
  };

  return (
<div className="form-container">
      {!isLoggedIn ? (
        <div>
          <h2>Login</h2>
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
          <button className="btn" onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2>Tell us about you</h2>

          <label>Courses</label>
          <input
            type="text"
            value={courses}
            onChange={(e) => setCourses(e.target.value)}
          />

          <label>Interests</label>
          <input
            type="text"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
          />

          <label>When are you on campus</label>
          <input
            type="text"
            value={campusTime}
            onChange={(e) => setCampusTime(e.target.value)}
          />

          <button type="submit" className="btn">Submit</button>
        </form>
      )}
    </div>
  );
}

export default Home;




