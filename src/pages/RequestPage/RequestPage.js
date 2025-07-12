import React, { useState } from 'react';
import './RequestPage.css';

const skills = ['Photography', 'Graphic Design', 'Web Development', 'UI/UX Design'];
const users = ['Sophia Clark', 'Ava Lee', 'Liam Smith'];

function RequestPage() {
  const [learnSkill, setLearnSkill] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [teachSkill, setTeachSkill] = useState('');

  return (
    <div className="requestpage-container">
      {/* Header */}
      <header className="request-navbar">
        <div className="request-navbar-left">
          <img src="/logo.jpg" alt="SkillSwap Logo" className="request-navbar-logo" />
          <span className="request-navbar-title">SkillSwap</span>
        </div>
        <div className="request-navbar-avatar">
          <img src="/user.jpg" alt="Profile" />
        </div>
      </header>

      <main className="request-main">
        <h1 className="request-title">Request a Skill Swap</h1>
        <p className="request-subtitle">Let's find the perfect partner to learn and grow with.</p>

        <div className="request-form-card">
          <div className="request-form-group">
            <label htmlFor="learnSkill">I want to learn...</label>
            <select
              id="learnSkill"
              value={learnSkill}
              onChange={e => setLearnSkill(e.target.value)}
            >
              <option value="">Select a skill</option>
              {skills.map(skill => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </select>
          </div>
          <div className="request-form-group">
            <label htmlFor="teachSkill">And I can teach...</label>
            <select
              id="teachSkill"
              value={teachSkill}
              onChange={e => setTeachSkill(e.target.value)}
            >
              <option value="">Select a skill</option>
              {skills.map(skill => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </select>
          </div>
          <div className="request-form-group">
            <label htmlFor="selectedUser">Message</label>
            <select
              id="selectedUser"
              value={selectedUser}
              onChange={e => setSelectedUser(e.target.value)}
            >
              <option value="">Select a user</option>
              {users.map(user => (
                <option key={user} value={user}>{user}</option>
              ))}
            </select>
          </div>
        </div>

        <button className="request-submit-btn" style={{marginTop: '1.5rem', width: '100%', maxWidth: 500}}>Send Swap Request</button>
      </main>
    </div>
  );
}

export default RequestPage;
