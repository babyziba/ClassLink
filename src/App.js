import React from 'react';
import MatchList from './components/MatchList';
import mockProfiles from './data/mockProfiles';
import './App.css';

function App() {
  return (
    <div className="App" style={{padding: '2rem', fontFamily: 'sans-serif'}}>
      <h1>Class link header </h1>
        <p>
        Find classmates with shared classes and interests.
        <MatchList profiles={mockProfiles} />
        <button style={{ padding: '0.6rem 1.2rem', fontSize: '1rem' }}>Get Started</button>
        </p>
    </div>
  );
}

export default App;
