import React from 'react';
import './get_started.css';
import students from '../assets/students.png'; // image import

function GetStarted() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h2 className="logo">ClassLink</h2>
        <nav>
          <ul className="nav-links">
            <li><a href="#">home</a></li>
            <li><a href="#">login</a></li>
          </ul>
        </nav>
      </header>

      <main className="home-main">
        <div className="text-section">
          <h1>Find classmates with<br />shared interests<br />and classes</h1>
          <button className="get-started-btn">get started</button>
        </div>
        <div className="image-section">
          <img src={students} alt="Students talking" />
        </div>
      </main>
    </div>
  );
}

export default GetStarted;
