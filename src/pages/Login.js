import React from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="login-wrapper">
      <header>
        <title>ClassLink | Login</title>
        <div className="logo">ClassLink</div>
        <div className="nav">
          <a href="#">home</a>
        </div>
      </header>

      <div className="container">
        <h1>Login</h1>
        <form>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />

          <button type="submit">Login</button>
        </form>
        <div className="toggle" onClick={() => navigate('/signup')}>
          Don't have an account? <strong>SIGNUP!</strong>
        </div>
      </div>
    </div>
  );
}
