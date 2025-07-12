import React, { useState } from 'react';
import './UserProfileForm.css';

function UserProfileForm({ onComplete }) {
  const [formData, setFormData] = useState({
    name: 'Amelia Pond',
    email: 'amelia.pond@example.com',
    bio: 'Passionate about watercolor painting and looking to learn guitar. I can teach you painting basics in exchange for some chords!',
    profilePhoto: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, profilePhoto: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      if (onComplete) onComplete();
    }, 1000);
  };

  return (
    <div className="settings-root">
      <aside className="settings-sidebar">
        <div className="settings-logo">SkillSwap</div>
        <nav className="settings-nav">
          <button className="settings-nav-item active">Profile</button>
          <button className="settings-nav-item">Notifications</button>
          <button className="settings-nav-item delete">LogOut</button>
        </nav>
      </aside>
      <main className="settings-main">
        <h1 className="settings-title">Settings</h1>
        <p className="settings-desc">Manage your account settings and preferences.</p>
        <form className="profile-info-card" onSubmit={handleSubmit}>
          <h2 className="profile-info-title">Profile Information</h2>
          <div className="profile-info-row">
            <div className="profile-avatar-section">
              <div className="profile-avatar">
                {/* Placeholder avatar */}
                <img src="https://ui-avatars.com/api/?name=Amelia+Pond&background=ececec&color=6bb7b7&size=96" alt="Profile" />
              </div>
              <label className="profile-change-pic-btn">
                <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
                Change Picture
              </label>
              <div className="profile-avatar-hint">JPG, GIF or PNG. 1MB max.</div>
            </div>
            <div className="profile-fields">
              <div className="profile-field-row">
                <div className="profile-field-col">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="profile-input"
                  />
                </div>
                <div className="profile-field-col">
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    disabled
                    className="profile-input"
                  />
                </div>
              </div>
              <div className="profile-field-row">
                <div className="profile-field-col" style={{ width: '100%' }}>
                  <label htmlFor="bio">Bio</label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="profile-input"
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="profile-info-actions">
            <button type="button" className="profile-cancel-btn" disabled={isSubmitting}>Cancel</button>
            <button type="submit" className="profile-update-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Updating...' : 'Update Profile'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default UserProfileForm; 