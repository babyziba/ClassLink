<<<<<<< HEAD
import React from 'react';
import './App.css';
import Home from './pages/home'; 

function App() {
  return (
    <div className="App">
      <Home />
    </div>
=======
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import GetStarted from "./pages/get_started.js";
import Signup from "./pages/signup.js";
import Login from "./pages/Login.js";
import Home from "./pages/home.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/get_started" />} />
        <Route path="/get_started" element={<GetStarted />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
>>>>>>> origin/beforemain
  );
}

export default App;
