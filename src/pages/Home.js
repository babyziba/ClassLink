import React from 'react';
import './Home.css'; // Make sure you create this file for styles
import illustration from '../assets/illustration.png'; // Save the image as 'illustration.png' in an assets folder

function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h2 className="logo">ClassLink</h2>
        <nav>
          <ul className="nav-links">
            <li>home</li>
            <li>login</li>
          </ul>
        </nav>
      </header>

      <main className="home-main">
        <div className="text-section">
          <h1>Find classmates with<br />shared Interested<br />and classes</h1>
          <button className="get-started-btn">get started</button>
        </div>
        <div className="image-section">
          <img src={illustration} alt="Students talking" />
        </div>
      </main>
    </div>
  );
}

export default Home;
