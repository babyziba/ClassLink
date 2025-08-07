import React from 'react';
import './home.css';
import beepAvatar from '../assets/beep.png'; 
import meepAvatar from '../assets/meep.png'; 

function Home() {
  const matches = [
    {
      name: 'Beep B.',
      courses: 'CS380, CS324',
      interests: 'Basketball, Anime',
      avatar: beepAvatar,
    },
    {
      name: 'Meep M.',
      courses: 'CS310, CS482',
      interests: 'Music, Gym',
      avatar: meepAvatar,
    },
  ];

  return (
    <div className="home-container">
      <header className="home-header">
        <h2 className="logo">ClassLink</h2>
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

<<<<<<< HEAD
export default Home;
=======
export default Home;
>>>>>>> origin/beforemain
