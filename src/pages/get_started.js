// ✅ Step 1: Use correct import path
import React from 'react';
import './get_started.css'; // 👈 THIS MUST MATCH YOUR CSS FILENAME EXACTLY

function GetStarted() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h2 className="logo">ClassLink</h2>
        <nav>
          <ul className="nav-links">
            <li><a href="/">home</a></li> {/* ✅ Valid href to avoid warning */}
            <li><a href="/login">login</a></li>
          </ul>
        </nav>
      </header>

      <main className="home-main">
        <div className="text-section">
          <h1>Find classmates with<br />shared interests<br />and classes</h1>
          <button className="get-started-btn">get started</button>
        </div>
        <div className="image-section">
          {/* Optional image:
              <img src={illustration} alt="Students talking" /> 
          */}
        </div>
      </main>
    </div>
  );
}

export default GetStarted; // ✅ Must match the function name
