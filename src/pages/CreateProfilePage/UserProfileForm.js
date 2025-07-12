import React, { useState } from 'react';
import '../../App.css';

function UserProfileForm({ onComplete }) {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    profilePhoto: null,
    skillsOffered: '',
    skillsWanted: '',
    availability: '',
    isPublic: true
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('skillsOffered', formData.skillsOffered);
      formDataToSend.append('skillsWanted', formData.skillsWanted);
      formDataToSend.append('availability', formData.availability);
      formDataToSend.append('isPublic', formData.isPublic);
      
      if (formData.profilePhoto) {
        formDataToSend.append('profilePhoto', formData.profilePhoto);
      }

      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        body: formDataToSend
      });

      if (response.ok) {
        setMessage('Profile created successfully! 🎉');
        setTimeout(() => {
          onComplete();
        }, 2000);
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message || 'Failed to create profile'}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Skill Swap Platform</h1>
        <p>Complete your profile to get started</p>
      </header>

      <main className="App-main">
        <div className="form-container">
          <h2>Create Your Profile</h2>
          
          {message && (
            <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-section">
              <h3>Basic Information</h3>
              
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="location">Location (Optional)</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="City, State, or Country"
                />
              </div>

              <div className="form-group">
                <label htmlFor="profilePhoto">Profile Photo (Optional)</label>
                <input
                  type="file"
                  id="profilePhoto"
                  name="profilePhoto"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </div>
            </div>

            <div className="form-section">
              <h3>Skills</h3>
              
              <div className="form-group">
                <label htmlFor="skillsOffered">Skills I Can Offer *</label>
                <textarea
                  id="skillsOffered"
                  name="skillsOffered"
                  value={formData.skillsOffered}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Web Development, Cooking, Spanish, Guitar, Photography"
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label htmlFor="skillsWanted">Skills I Want to Learn *</label>
                <textarea
                  id="skillsWanted"
                  name="skillsWanted"
                  value={formData.skillsWanted}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Graphic Design, French, Piano, Yoga, Coding"
                  rows="3"
                />
              </div>
            </div>

            <div className="form-section">
              <h3>Availability</h3>
              
              <div className="form-group">
                <label htmlFor="availability">When are you available? *</label>
                <textarea
                  id="availability"
                  name="availability"
                  value={formData.availability}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Weekends, Evenings after 6 PM, Tuesday/Thursday mornings"
                  rows="2"
                />
              </div>
            </div>

            <div className="form-section">
              <h3>Privacy Settings</h3>
              
              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="isPublic"
                    checked={formData.isPublic}
                    onChange={handleInputChange}
                  />
                  <span className="checkmark"></span>
                  Make my profile public (others can see and contact me)
                </label>
              </div>
            </div>

            <button 
              type="submit" 
              className="submit-btn" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating Profile...' : 'Create Profile'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default UserProfileForm; 