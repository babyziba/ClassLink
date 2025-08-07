import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './home.css';
import beepAvatar from '../assets/beep.png'; 
import meepAvatar from '../assets/meep.png'; 

function Home({ studentId }) {
  // 1) Local state for matches
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    // 2) Fetch top-10 matches for this student
    axios
      .get(`/api/matches/${studentId}`, { params: { limit: 10 } })
      .then(({ data }) => {
        // data is an array of { _id, firstName, lastName, commonCount, commonCourses }
        // Map it to the shape your UI expects:
        const uiMatches = data.map(m => ({
          id:       m._id,
          name:     `${m.firstName} ${m.lastName}`,
          // turn the array of IDs into a comma-list; you could instead fetch names
          courses:  m.commonCourses.join(', '),
          // you don’t yet have interests in the API, so leave blank (or fetch later)
          interests:'',
          avatar:   // pick an avatar based on index or m._id
            m._id === '68773a47f0123b40ff91ae4b'
              ? meepAvatar
              : beepAvatar
        }));
        setMatches(uiMatches);
      })
      .catch(err => console.error('Error fetching matches:', err));
  }, [studentId]);

  return (
    <div className="home-container">
      <header className="home-header">
        <h2 className="logo">ClassLink</h2>
        <nav><a className="home-link" href="#">home</a></nav>
      </header>

      <main className="home-main">
        <h1>My matches</h1>
        <p className="filter-text">Filter matches</p>

        {matches.map((match, idx) => (
          <div className="match-card" key={match.id || idx}>
            <div className="match-info">
              <img className="avatar" src={match.avatar} alt="avatar" />
              <div>
                <h2 className="match-name">{match.name}</h2>
                <p>
                  <strong>Shared courses</strong>
                  <span className="gray-text"> {match.courses}</span>
                </p>
                <p>
                  <strong>Shared interests</strong>
                  <span className="gray-text"> {match.interests}</span>
                </p>
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
