import React, { useState, useEffect } from 'react';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';

function HomePage({ onLoginClick, isLoggedIn, onLogout, onRequestUser }) {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [page, setPage] = useState(1);
  const usersPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch users from backend
    fetch('http://localhost:5000/api/users')
      .then(res => res.json())
      .then(data => {
        if (data.success) setUsers(data.data);
      });
  }, []);

  // Check if user is logged in
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  // Filter users based on search (live search)
  const filteredUsers = users.filter(user =>
    (String(user.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (Array.isArray(user.skillsOffered) ? user.skillsOffered.join(', ') : String(user.skillsOffered || '')).toLowerCase().includes(search.toLowerCase()) ||
      (Array.isArray(user.skillsWanted) ? user.skillsWanted.join(', ') : String(user.skillsWanted || '')).toLowerCase().includes(search.toLowerCase()))
  );

  const paginatedUsers = filteredUsers.slice((page - 1) * usersPerPage, page * usersPerPage);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Only show up to 4 users in the featured section
  const featuredUsers = paginatedUsers.slice(0, 4);

  const handleRequest = (user) => {
    if (!isLoggedIn) {
      onLoginClick();
    } else {
      // TODO: Implement request logic for logged-in users
      alert('Request sent to ' + user.name);
    }
  };

  return (
    <div className="ss-home-root">
      {/* Navbar */}
      <header className="ss-navbar">
        <div className="ss-navbar-left">
          <img src="/logo.jpg" alt="SkillSwap Logo" className="ss-navbar-logo" />
          <span className="ss-navbar-title">SkillSwap</span>
        </div>
        <nav className="ss-navbar-links">
          <a href="#browse">Browse</a>
          <a href="#how">How it Works</a>
          <a href="#about">About Us</a>
        </nav>
        <div className="ss-navbar-actions">
          {!isLoggedIn && <button className="ss-login-btn" onClick={() => navigate('/login')}>Log In</button>}
          {!isLoggedIn && <button className="ss-signup-btn" onClick={() => navigate('/signup')}>Sign Up</button>}
          {isLoggedIn && <button className="ss-logout-btn" onClick={onLogout}>Logout</button>}
          {user && user.name && <div className="ss-navbar-username">{user.name}</div>}
        </div>
      </header>

      {/* Hero Section */}
      <section className="ss-hero">
        <h1 className="ss-hero-title">Unlock Your Potential, <br />Share Your Skills</h1>
        <p className="ss-hero-subtitle">
          Join our community of learners and experts. Exchange your skills with others and discover new passions.
        </p>
        <div className="ss-hero-searchbar">
          <input
            type="text"
            placeholder="Whom do you want to swap with today?"
            value={search}
            onChange={e => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
      </section>

      {/* Featured Skills Section */}
      <section className="ss-featured-section" id="browse">
        <div className="ss-featured-header-row">
          <h2 className="ss-featured-title">Featured Skills</h2>
        </div>
        <div className="ss-featured-cards">
          {featuredUsers.length === 0 && (
            <div className="ss-featured-empty">No skills found.</div>
          )}
          {featuredUsers.map(user => (
            <div
              className="ss-featured-card"
              key={user._id}
              onClick={() => navigate('/view-profile')}
              style={{ cursor: 'pointer' }}
            >
              <div className="ss-featured-card-img">
                <img src="/user.jpg" alt="User" />
              </div>
              <div className="ss-featured-card-content">
                <h3 className="ss-featured-card-title">{user.name}</h3>
                <p className="ss-featured-card-desc">Skills Offered: {user.skillsOffered}</p>
                <p className="ss-featured-card-desc">Skills Wanted: {user.skillsWanted}</p>
                <button
                  className="ss-featured-learn-btn"
                  onClick={e => {
                    e.stopPropagation();
                    navigate('/request');
                  }}
                >
                  Request
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="ss-featured-pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`ss-featured-pagebtn${page === i + 1 ? ' active' : ''}`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="ss-cta-section">
        <h2 className="ss-cta-title">Ready to Start Your Journey?</h2>
        <p className="ss-cta-desc">
          Join our vibrant community today and unlock a world of knowledge. It's free to sign up!
        </p>
        <div className="ss-cta-actions">
          <button className="ss-signup-btn" onClick={() => navigate('/signup')}>Sign Up Now</button>
          <button className="ss-browse-btn" onClick={() => window.scrollTo({ top: document.getElementById('browse').offsetTop, behavior: 'smooth' })}>Browse Skills</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="ss-footer">
        <div className="ss-footer-links">
          <a href="#about">About Us</a>
          <a href="#contact">Contact</a>
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
        </div>
        <div className="ss-footer-social">
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-facebook"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
        </div>
        <div className="ss-footer-copy">© 2024 SkillSwap. All rights reserved.</div>
      </footer>
    </div>
  );
}

export default HomePage;
