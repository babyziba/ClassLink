// src/pages/home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './home.css';
import beepAvatar from '../assets/beep.png';
import meepAvatar from '../assets/meep.png';

axios.defaults.baseURL = 'http://localhost:5001';   

function Home() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const dummyUserId = '68773981f0123b40ff91ae4a';          

    axios
      .get('/api/classmates', { params: { userId: dummyUserId } })
      .then(res =>
        setMatches(
          res.data.map((m, i) => ({
            ...m,
            avatar: i % 2 ? beepAvatar : meepAvatar,
            courses: (m.courses || []).join(', '),
            interests: (m.interests || []).join(', ')
          }))
        )
      )
      .catch(console.error);
  }, []);

  return (
    <div className="home-container">
      <header className="home-header">
        <h2 className="logo">ClassLink</h2>
        <title>ClassLink | Home</title>
        <nav><a className="home-link" href="#">home</a></nav>
      </header>

      <main className="home-main">
        <h1>My matches</h1>
        <p className="filter-text">Filter matches</p>

        {matches.map((match, index) => (
          <div className="match-card" key={index}>
            <div className="match-info">
              <img className="avatar" src={match.avatar} alt="avatar" />
              <div>
                <h2 className="match-name">{match.name}</h2>
                <p><strong>Shared courses</strong> <span className="gray-text">{match.courses}</span></p>
                <p><strong>Shared interests</strong> <span className="gray-text">{match.interests}</span></p>
              </div>
            </div>
            <button className="connect-button">Connect</button>
          </div>
        ))}
      </main>
    </div>
  );
}

export default Home;
