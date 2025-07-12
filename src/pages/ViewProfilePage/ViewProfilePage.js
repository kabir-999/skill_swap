import React from 'react';
import './ViewProfilePage.css';
import { useNavigate } from 'react-router-dom';

const profile = {
  name: 'Sophia Bennett',
  title: 'Software Engineer | San Francisco',
  status: 'Available for swaps',
  about:
    "I'm a software engineer with 5 years of experience, specializing in web development. I'm passionate about learning new technologies and sharing my knowledge with others.",
  avatar: '/user.jpg',
};

const skillsOffered = [
  {
    name: 'Web Development',
    proficiency: 'Advanced',
    description:
      'I can help you build responsive and interactive web applications using React, Node.js, and Express.',
  },
  {
    name: 'Data Structures & Algorithms',
    proficiency: 'Intermediate',
    description:
      'I can teach you the fundamentals of data structures and algorithms, and help you prepare for technical interviews.',
  },
];

const skillsWanted = [
  {
    name: 'UI/UX Design',
    proficiency: 'Beginner',
    description:
      'I want to learn how to create stunning visual designs for web and mobile applications.',
  },
  {
    name: 'Digital Marketing',
    proficiency: 'Beginner',
    description:
      'I\'m interested in learning how to create engaging and effective marketing campaigns.',
  },
];

function ViewProfilePage() {
  const navigate = useNavigate();

  return (
    <div className="vsp-root">
      {/* Header */}
      <header className="vsp-navbar">
        <div className="vsp-navbar-left">
          <img src="/logo.jpg" alt="SkillSwap Logo" className="vsp-navbar-logo" />
          <span className="vsp-navbar-title">SkillSwap</span>
        </div>
        <div className="vsp-navbar-avatar">
          <img src={profile.avatar} alt="Profile" />
        </div>
      </header>

      {/* Main Content */}
      <div className="vsp-main-content">
        {/* Left Profile Card */}
        <aside className="vsp-profile-card">
          <div className="vsp-profile-img-wrapper">
            <img src={profile.avatar} alt="Profile" className="vsp-profile-img" />
          </div>
          <h2 className="vsp-profile-name">{profile.name}</h2>
          <div className="vsp-profile-title">{profile.title}</div>
          <div className="vsp-profile-status">{profile.status}</div>
          <button className="vsp-profile-swap-btn" onClick={() => navigate('/request')}>Start a Swap</button>
          <div className="vsp-profile-about-title">About Me</div>
          <div className="vsp-profile-about">{profile.about}</div>
        </aside>

        {/* Right Main Section */}
        <section className="vsp-skills-section">
          <div className="vsp-skills-group">
            <h3 className="vsp-skills-header">Skills I Offer</h3>
            <div className="vsp-skills-cards-row">
              {skillsOffered.map((skill, idx) => (
                <div className="vsp-skill-card" key={idx}>
                  <div className="vsp-skill-title">{skill.name}</div>
                  <div className="vsp-skill-proficiency vsp-skill-proficiency-offer">
                    Proficiency: {skill.proficiency}
                  </div>
                  <div className="vsp-skill-desc">{skill.description}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="vsp-skills-group">
            <h3 className="vsp-skills-header">Skills I Want</h3>
            <div className="vsp-skills-cards-row">
              {skillsWanted.map((skill, idx) => (
                <div className="vsp-skill-card vsp-skill-card-want" key={idx}>
                  <div className="vsp-skill-title">{skill.name}</div>
                  <div className="vsp-skill-proficiency vsp-skill-proficiency-want">
                    Desired Proficiency: {skill.proficiency}
                  </div>
                  <div className="vsp-skill-desc">{skill.description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ViewProfilePage;
