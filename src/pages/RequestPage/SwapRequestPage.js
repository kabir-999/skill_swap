import React from 'react';
import '../CreateProfilePage/ProfilePage.css';
import './SwapRequestPage.css';
import logo from '../../assets/logo.png';
import profileImg from '../../assets/profile.png';

const requests = [
  {
    id: 1,
    name: 'Marc Demo',
    photo: profileImg,
    rating: 3.9,
    skillsOffered: ['JavaScript'],
    skillsWanted: ['Photoshop'],
    status: 'pending',
  },
  {
    id: 2,
    name: 'Marc Demo',
    photo: profileImg,
    rating: 3.9,
    skillsOffered: ['JavaScript'],
    skillsWanted: ['Photoshop'],
    status: 'pending',
  },
];

const statusColors = {
  pending: '#888',
  accepted: '#1bb81b',
  rejected: '#e23b3b',
};

const SwapRequestPage = () => {
  return (
    <div className="profile-bg">
      <main className="swap-main">
        <div className="swap-controls-centered">
          <select className="swap-filter">
            <option>Pending</option>
            <option>Accepted</option>
            <option>Rejected</option>
          </select>
          <input className="swap-search" placeholder="" />
          <button className="swap-search-btn">Search</button>
        </div>
        <div className="swap-request-list">
          {requests.map((req) => (
            <div className="swap-request-card teal-card" key={req.id}>
              <div className="swap-card-left">
                <div className="swap-card-avatar">
                  <img src={req.photo} alt="Profile" />
                </div>
                <div className="swap-card-name">{req.name}</div>
              </div>
              <div className="swap-card-center">
                <div className="swap-card-skills-row">
                  <span className="swap-card-label">Skills Offered =&gt;</span>
                  {req.skillsOffered.map((s, i) => (
                    <span className="profile-skill-tag" key={i}>{s}</span>
                  ))}
                </div>
                <div className="swap-card-skills-row">
                  <span className="swap-card-label">Skills Wanted =&gt;</span>
                  {req.skillsWanted.map((s, i) => (
                    <span className="profile-skill-tag" key={i}>{s}</span>
                  ))}
                </div>
              </div>
              <div className="swap-card-right">
                <div className="swap-card-status">
                  Status <span style={{ color: statusColors[req.status], fontWeight: 700, marginLeft: '90px', display: 'inline-block' }}>{req.status.charAt(0).toUpperCase() + req.status.slice(1)}</span>
                </div>
                <div className="swap-card-actions">
                  <span className="swap-accept">Accept</span>
                  <span className="swap-reject">Reject</span>
                </div>
                <div className="swap-card-rating">Rating: <b>{req.rating} / 5</b></div>
              </div>
            </div>
          ))}
        </div>
        <div className="swap-pagination">
          &lt; <span className="swap-page-active">1</span> 2 3 &gt;
        </div>
      </main>
    </div>
  );
};

export default SwapRequestPage; 