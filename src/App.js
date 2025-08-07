// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import GetStarted from "./pages/get_started";
import Signup     from "./pages/signup";
import Login      from "./pages/Login";
import Home       from "./pages/home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/get_started" replace />} />
        <Route path="/get_started" element={<GetStarted />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/* 👇 pass the actual MongoDB ObjectId (not the username) */}
        <Route
          path="/home"
          element={
            <Home studentId="68773981f0123b40ff91ae4a" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
