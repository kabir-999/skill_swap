import React, { useEffect, useRef } from 'react';
import './ViewProfilePage.css';
import { useNavigate } from 'react-router-dom';

function useScrollFadeIn() {
  const ref = useRef();
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('in-view');
          observer.unobserve(node);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return ref;
}

const skillsOffered = ['Python', 'JavaScript', 'Figma'];
const skillsAccepted = ['HTML', 'CSS', 'Mummy'];

function ViewProfilePage() {
  const mainRef = useScrollFadeIn();
  const skillsRef = useScrollFadeIn();
  const ratingRef = useScrollFadeIn();
  const navigate = useNavigate();

  return (
    <div className="profilepage-container">
      <header className="profile-navbar">
        <img src="/logo.jpg" alt="Logo" className="navbar-logo-img" />
        <nav className="profile-navlinks">
          <a href="#swap">Swap Request</a>
          <a href="#home">Home</a>
        </nav>
        <div className="profile-avatar-placeholder" />
      </header>
      <main className="profile-main fade-in-up" ref={mainRef}>
        <div className="profile-header-row">
          <img src="/user.jpg" alt="Profile" className="profile-picture" />
          <div className="profile-header-content">
            <h2 className="profile-username">Marc Demo</h2>
          </div>
          <button className="profile-request-btn" onClick={() => navigate('/request')}>Request</button>
        </div>
        <div className="profile-skills-row fade-in-up" ref={skillsRef}>
          <div className="profile-skills-card">
            <div className="profile-skills-title">Skills Offered</div>
            <ul className="profile-skills-list-bullets">
              {skillsOffered.map((skill, idx) => (
                <li key={idx}>{skill}</li>
              ))}
            </ul>
          </div>
          <div className="profile-skills-card">
            <div className="profile-skills-title">Skills Wanted</div>
            <ul className="profile-skills-list-bullets">
              {skillsAccepted.map((skill, idx) => (
                <li key={idx}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="profile-rating-card fade-in-up" ref={ratingRef}>
          <div className="profile-rating-title">Rating & Feedback</div>
          <div className="profile-rating-stars">
            <span className="star filled">★</span>
            <span className="star filled">★</span>
            <span className="star filled">★</span>
            <span className="star">★</span>
            <span className="star">★</span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ViewProfilePage;
