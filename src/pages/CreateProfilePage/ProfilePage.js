import React from 'react';
import './ProfilePage.css';
import logo from '../../assets/logo.png';
import profileImg from '../../assets/profile.png';

const ProfilePage = () => {
  return (
    <div className="profile-bg">
      <header className="profile-header">
        <div className="logo-area">
          <img src={logo} alt="Swap Skill Logo" className="profile-logo-img" />
        </div>
        <div className="profile-actions">
          <span className="save-btn">SAVE</span>
          <span className="discard-btn">DISCARD</span>
          <a href="#" className="nav-link">Swap Request</a>
          <a href="#" className="nav-link">Home</a>
          <div className="profile-avatar-placeholder"></div>
        </div>
      </header>
      <main className="profile-main">
        <div className="profile-form-grid">
          <div className="profile-form-left">
            <div className="profile-field name">
              <label>Name</label>
              <div className="profile-value-box">John Doe</div>
            </div>
            <div className="profile-field location">
              <label>Location</label>
              <div className="profile-value-box">New York, USA</div>
            </div>
            <div className="profile-field availability">
              <label>Availability</label>
              <div className="profile-value-box">Weekends, Evenings</div>
            </div>
            <div className="profile-field profile">
              <label>Profile</label>
              <div className="profile-value-box">Web developer and avid learner.</div>
            </div>
          </div>
          <div className="profile-form-right">
            <div className="profile-avatar-big">
              <img src={profileImg} alt="Profile" className="profile-avatar-img" />
            </div>
            <div className="profile-field profile-field-right skills-offered">
              <label>Skills Offered</label>
              <div className="profile-skills-row">
                <span className="profile-skill-tag">React</span>
                <span className="profile-skill-tag">Node.js</span>
                <span className="profile-skill-tag">UI/UX</span>
              </div>
            </div>
            <div className="profile-field profile-field-right skills-wanted">
              <label>Skills Wanted</label>
              <div className="profile-skills-row">
                <span className="profile-skill-tag">Python</span>
                <span className="profile-skill-tag">French</span>
                <span className="profile-skill-tag">Guitar</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage; 