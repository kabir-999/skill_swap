<<<<<<< HEAD
import React, { useState } from 'react';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';

const usersData = [
  {
    id: 1,
    name: 'User No. 1',
    skillsOffered: 'JavaScript, SQL, Python',
    skillsAccepted: 'JavaScript, SQL, Python',
  },
  {
    id: 2,
    name: 'User No. 2',
    skillsOffered: 'JavaScript, SQL, Python',
    skillsAccepted: 'JavaScript, SQL, Python',
  },
  {
    id: 3,
    name: 'User No. 2',
    skillsOffered: 'JavaScript, SQL, Python',
    skillsAccepted: 'JavaScript, SQL, Python',
  },
  {
    id: 4,
    name: 'User No. 2',
    skillsOffered: 'JavaScript, SQL, Python',
    skillsAccepted: 'JavaScript, SQL, Python',
  },
  {
    id: 5,
    name: 'User No. 2',
    skillsOffered: 'JavaScript, SQL, Python',
    skillsAccepted: 'JavaScript, SQL, Python',
  },
  {
    id: 6,
    name: 'User No. 2',
    skillsOffered: 'JavaScript, SQL, Python',
    skillsAccepted: 'JavaScript, SQL, Python',
  },
];

function HomePage() {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [page, setPage] = useState(1);
  const usersPerPage = 5;
  const navigate = useNavigate();

  const filteredUsers = usersData.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.skillsOffered.toLowerCase().includes(search.toLowerCase()) ||
    user.skillsAccepted.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedUsers = filteredUsers.slice((page - 1) * usersPerPage, page * usersPerPage);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="homepage-container">
      <div className="homepage-navbar-wrapper">
        <img src="/logo.jpg" alt="Logo" className="navbar-logo-img" />
        <nav className="homepage-navbar">
          <a href="#home">Home</a>
          <a href="#about">About Us</a>
          <a href="#contact">Contact Us</a>
        </nav>
        <button className="homepage-login-btn">Login</button>
      </div>
      <div className="homepage-gradient">
        <div className="homepage-center-text">
          <div className="homepage-welcome">Welcome to</div>
          <div className="homepage-skillswap">SKILLSWAP</div>
        </div>
      </div>
      <div className="homepage-below-gradient">
        <h2>About Us</h2>
        <p>
          SkillSwap connects people eager to share and learn new skills through direct, peer-to-peer exchanges. List what you can teach, find what you want to learn, and swap skills with others in a friendly, supportive community.
        </p>
        <div className="userlist-controls-wrapper">
          <div className="userlist-controls">
            <select value={sort} onChange={e => setSort(e.target.value)} className="userlist-sort">
              <option value="">Sort By</option>
              <option value="name">Name</option>
              <option value="skills">Skills</option>
            </select>
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="userlist-search"
            />
          </div>
        </div>
        <div className="userlist-list">
          {paginatedUsers.map(user => (
            <div
              className="userlist-card clickable"
              key={user.id}
              onClick={() => navigate('/view-profile')}
              style={{ cursor: 'pointer' }}
            >
              <div className="userlist-avatar" />
              <div className="userlist-info">
                <div className="userlist-name">{user.name}</div>
                <div className="userlist-skills">
                  <span>Skills Offered: {user.skillsOffered}</span><br />
                  <span>Skills Accepted: {user.skillsAccepted}</span>
                </div>
              </div>
              <button className="userlist-request">Request</button>
            </div>
          ))}
        </div>
        <div className="userlist-pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`userlist-pagebtn${page === i + 1 ? ' active' : ''}`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
      <section className="homepage-contact-section" id="contact">
        <h2>Contact Us</h2>
        <form className="homepage-contact-form">
          <input type="text" placeholder="Your Name" name="name" required />
          <input type="email" placeholder="Your Email" name="email" required />
          <textarea placeholder="Your Message" name="message" rows="5" required />
          <button type="submit">Send Message</button>
        </form>
      </section>
=======
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
>>>>>>> d35c195 (Added profile)
    </div>
  );
}

<<<<<<< HEAD
export default HomePage;
=======
export default Home; 
>>>>>>> d35c195 (Added profile)
