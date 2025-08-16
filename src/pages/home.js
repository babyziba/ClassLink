// src/pages/home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './home.css';
import beepAvatar from '../assets/beep.png';
import meepAvatar from '../assets/meep.png';



function Home() {
  const API_BASE_URL = process.env.REACT_APP_BASE_URL || "https://classlink-oc9n.onrender.com";
  const api = axios.create({ baseURL: API_BASE_URL });
  const [matches, setMatches] = useState([]);

  const [openId, setOpenId] = useState(null);

  const user = localStorage.getItem("email");

  const [filterMode, setFilterMode] = useState('all'); 

  useEffect(() => {        

    const response = api
      .get('/api/classmates', { params: { email: user } })
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

  const handleConnect = (idx) => setOpenId(openId === idx ? null : idx);

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied to clipboard");
    } catch (error)
    {
      alert("Could not copy to clipboard");
    }
  };

  const handleFilterClick = () => {
    const choice = window.prompt('Filter by "courses" or "interests"?', 'courses');
    if (!choice) return;
    const v = choice.trim().toLowerCase();
    if (v.startsWith('c')) setFilterMode('courses');
    else if (v.startsWith('i')) setFilterMode('interests');
    else alert('Please type "courses" or "interests".');
  };

  const clearFilter = () => setFilterMode('all');

  const filteredMatches = matches.filter(m => {
    if (filterMode === 'courses')    return (m.courses || '').trim().length > 0;
    if (filterMode === 'interests')  return (m.interests || '').trim().length > 0;
    return true; // 'all'
  });
  return (
    <div className="home-container">
      <header className="home-header">
        <h2 className="logo">ClassLink</h2>
        <title>ClassLink | Home</title>
        <nav><a className="home-link" href="#">home</a></nav>
      </header>

      <main className="home-main">
        <h1>My matches</h1>

        <div className="filter-row">
          <button className="connect-button" onClick={handleFilterClick}>Filter matches</button>
          {filterMode !== 'all' && (
            <button className="secondary-button" onClick={clearFilter}>
              Clear filter ({filterMode})
            </button>
          )}
        </div>

        {filteredMatches.map((match, index) => (
          <div className="match-card" key={index}>
            <div className="match-info">
              <img className="avatar" src={match.avatar} alt="avatar" />
              <div>
                <h2 className="match-name">{match.name}</h2>
                <p><strong>Shared courses</strong> <span className="gray-text">{match.courses}</span></p>
                <p><strong>Shared interests</strong> <span className="gray-text">{match.interests}</span></p>
              </div>
            </div>
            <button className="connect-button" onClick={() => handleConnect(index)}>
              {openId === index ? 'Hide' : 'Connect'}
            </button>

            {openId === index && (
              <div className="email-box" role="dialog" aria-label={`Contact ${match.name}`}>
                <p className="email-line">
                  <strong>Email:</strong>{' '}
                  <a href={`mailto:${match.email}`}>{match.email || 'Not available'}</a>
                </p>
                <div className="popover-actions">
                  <button className="secondary-button" onClick={() => handleCopy(match.email)}>
                    Copy
                  </button>
                  <button className="secondary-button" onClick={() => setOpenId(null)}>
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {filteredMatches.length === 0 && (
          <p className="gray-text">No matches for this filter.</p>
        )}
      </main>
    </div>
  );
}

export default Home;