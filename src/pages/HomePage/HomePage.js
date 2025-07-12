import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';
// Removed useNavigate and react-router-dom import for now

function HomePage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [page, setPage] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const usersPerPage = 5;
  // Removed useNavigate for now

  useEffect(() => {
    // Fetch users from backend
    fetch('http://localhost:5000/api/users')
      .then(res => res.json())
      .then(data => {
        if (data.success) setUsers(data.data);
      })
      .catch(error => {
        console.log('Backend not running, using fallback data');
        // Fallback data when backend is not available
        setUsers([
          {
            _id: 1,
            name: 'John Doe',
            skillsOffered: 'JavaScript, React, Node.js',
            skillsWanted: 'Python, Machine Learning',
          },
          {
            _id: 2,
            name: 'Jane Smith',
            skillsOffered: 'Python, Data Analysis',
            skillsWanted: 'Web Development, UI/UX',
          },
          {
            _id: 3,
            name: 'Mike Johnson',
            skillsOffered: 'Graphic Design, Photoshop',
            skillsWanted: 'JavaScript, Frontend Development',
          },
          {
            _id: 4,
            name: 'Sarah Wilson',
            skillsOffered: 'Content Writing, SEO',
            skillsWanted: 'Digital Marketing, Social Media',
          },
          {
            _id: 5,
            name: 'Alex Brown',
            skillsOffered: 'Mobile Development, Flutter',
            skillsWanted: 'Backend Development, Database Design',
          }
        ]);
      });
  }, []);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsLoggedIn(true);
    } else {
      setUser(null);
      setIsLoggedIn(false);
    }
  }, []);

  // Listen for login/logout changes in localStorage
  useEffect(() => {
    const handleStorage = () => {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    };

    // Listen for storage events (cross-tab)
    window.addEventListener('storage', handleStorage);
    
    // Listen for custom login/logout events (same tab)
    const handleLoginEvent = () => {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
        setIsLoggedIn(true);
      }
    };

    const handleLogoutEvent = () => {
      setUser(null);
      setIsLoggedIn(false);
    };

    window.addEventListener('userLogin', handleLoginEvent);
    window.addEventListener('userLogout', handleLogoutEvent);
    
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('userLogin', handleLoginEvent);
      window.removeEventListener('userLogout', handleLogoutEvent);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    // Dispatch custom event for same-tab logout detection
    window.dispatchEvent(new Event('userLogout'));
    setUser(null);
    setIsLoggedIn(false);
    navigate('/');
  };

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

  return (
    <div className="homepage-container">
      <div className="homepage-navbar-wrapper">
        <img src="/logo.jpg" alt="Logo" className="navbar-logo-img" />
        <nav className="homepage-navbar">
          <a href="#home">Home</a>
          <a href="#about">About Us</a>
          <a href="#contact">Contact Us</a>
        </nav>
        {!isLoggedIn ? (
          <div className="ss-navbar-actions">
            <button className="ss-login-btn" onClick={() => navigate('/login')}>Log In</button>
            <button className="ss-signup-btn" onClick={() => navigate('/signup', { state: { isSignup: true } })}>Sign Up</button>
          </div>
        ) : (
          <>
            {user && user.name && <div className="ss-navbar-username">{user.name}</div>}
            <div className="ss-navbar-actions-right">
              <button className="ss-logout-btn" onClick={handleLogout}>Logout</button>
            </div>
          </>
        )}
      </div>

      {/* Hero Section */}
      <section className="ss-hero">
        <h1 className="ss-hero-title">Unlock Your Potential,<br />Share Your Skills</h1>
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
      
      {/* Debug content to test scrolling */}
      <div style={{ 
        height: '1000px', 
        background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '2rem',
        color: 'white',
        textAlign: 'center'
      }}>
        <div>
          <h2>Scroll Test Content</h2>
          <p>If you can see this, scrolling should work!</p>
          <p>This div is 1000px tall to test scrolling.</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
