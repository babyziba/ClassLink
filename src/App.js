// import React from 'react';
// import MatchList from './components/MatchList';
// import mockProfiles from './data/mockProfiles';
// import './App.css';
// import Home from './pages/get_started.js';

// function App() {
//   return (
//     <div className="App" style={{padding: '2rem', fontFamily: 'sans-serif'}}>
//       <h1>Class link header </h1>
//         <p>
//         Find classmates with shared classes and interests.
//         <MatchList profiles={mockProfiles} />
//         <button style={{ padding: '0.6rem 1.2rem', fontSize: '1rem' }}>Get Started</button>
//         </p>
//     </div>
//   );
// }


import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import get_started from "./pages/get_started.js";

function App() {
  return (
    <Router>
      <Route path="/" element={<Navigate to="/get_started" />} />
      <Route path="/getstarted" element={<Navigate to="/get_started" />} />
    </Router>
  )
}

export default App;



