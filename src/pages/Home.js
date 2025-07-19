import React from 'react';
import './home.css';  // ✅ fix 1: corrected capitalization
// import illustration from '../assets/illustration.png'; // ❌ fix 2: no such file yet

function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h2 className="logo">ClassLink</h2>
        <nav>
          <ul className="nav-links">
            <li><a href="#" style={{ textDecoration: 'none', color: 'gray' }}>home</a></li>
            <li><a href="#" style={{ textDecoration: 'none', color: 'gray' }}>login</a></li>
          </ul>
        </nav>
      </header>

      <main className="home-main">
        <div className="text-section">
          <h1>Find classmates with<br />shared interests<br />and classes</h1>
          <button className="get-started-btn">get started</button>
        </div>
        <div className="image-section">
          {/* <img src={illustration} alt="Students talking" /> */}
        </div>
      </main>
    </div>
  );
}

export default Home;
