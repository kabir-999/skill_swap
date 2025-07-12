import React from 'react';
import './Home.css';

function Home({ onLogout }) {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Welcome to Skill Swap Platform</h1>
        <p>Hello, {user.email}!</p>
        <button onClick={onLogout} className="logout-button">
          Logout
        </button>
      </div>
      
      <div className="home-content">
        <div className="empty-state">
          <h2>Home Page</h2>
          <p>This page is empty for now as requested.</p>
          <p>You can add content here later.</p>
        </div>
      </div>
    </div>
  );
}

export default Home; 