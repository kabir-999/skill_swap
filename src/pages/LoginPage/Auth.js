import React, { useState, useEffect } from 'react';
import './Auth.css';
import { useNavigate } from 'react-router-dom';

function Auth({ isSignup: initialIsSignup = false }) {
  const [isSignup, setIsSignup] = useState(initialIsSignup);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Update isSignup state when prop changes
  useEffect(() => {
    setIsSignup(initialIsSignup);
  }, [initialIsSignup]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    try {
      if (isSignup) {
        // Signup logic
        const response = await fetch('http://localhost:5000/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            name: formData.name,
            username: formData.username
          })
        });

        const data = await response.json();
        
        if (data.success) {
          setMessage('Signup successful! Redirecting...');
          setTimeout(() => navigate('/'), 1500);
        } else {
          setMessage(data.message || 'Signup failed');
        }
      } else {
        // Login logic
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        });

        const data = await response.json();
        
        if (data.success) {
          // Store user data in localStorage
          localStorage.setItem('user', JSON.stringify(data.user));
          // Dispatch custom event for same-tab login detection
          window.dispatchEvent(new Event('userLogin'));
          setMessage('Login successful! Redirecting...');
          setTimeout(() => navigate('/'), 1500);
        } else {
          setMessage(data.message || 'Login failed');
        }
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-bg">
      <form className="auth-card-modern" onSubmit={handleSubmit}>
        <div className="auth-card-header">
          <div className="auth-card-title">SkillSwap</div>
          <div className="auth-card-subtitle">{isSignup ? 'Create your account' : 'Welcome back!'}</div>
        </div>
        <div className="auth-card-body">
          {isSignup && (
            <div className="auth-form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="John Doe"
                required
              />
            </div>
          )}
          <div className="auth-form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="you@example.com"
              required
            />
          </div>
          {isSignup && (
            <div className="auth-form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="yourusername"
                required
              />
            </div>
          )}
          <div className="auth-form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="********"
              required
            />
          </div>
          {message && <div className="auth-message">{message}</div>}
          <button className="auth-submit-btn" type="submit" disabled={isSubmitting}>
            {isSignup ? 'Sign Up' : 'Log In'}
          </button>
        </div>
        <div className="auth-card-footer">
          {isSignup ? (
            <span>Already have an account?{' '}
              <button type="button" className="auth-link-btn" onClick={() => setIsSignup(false)}>Log in</button>
            </span>
          ) : (
            <span>Don't have an account?{' '}
              <button type="button" className="auth-link-btn" onClick={() => setIsSignup(true)}>Sign up</button>
            </span>
          )}
        </div>
      </form>
    </div>
  );
}

export default Auth; 