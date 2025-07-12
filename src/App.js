import React, { useState, useEffect } from 'react';
import './App.css';
import Auth from './components/Auth';
import Home from './components/Home';
import UserProfileForm from './UserProfileForm';

function App() {
  const [currentPage, setCurrentPage] = useState('auth'); // 'auth', 'home', 'profile'
  const [, setUser] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setCurrentPage('home');
    }
  }, []);

  const handleAuthSuccess = () => {
    const savedUser = localStorage.getItem('user');
    setUser(JSON.parse(savedUser));
    setCurrentPage('home');
  };

  const handleNavigateToProfile = () => {
    setCurrentPage('profile');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setCurrentPage('auth');
  };

  const handleProfileComplete = () => {
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'auth':
        return (
          <Auth 
            onAuthSuccess={handleAuthSuccess}
            onNavigateToProfile={handleNavigateToProfile}
          />
        );
      case 'home':
        return <Home onLogout={handleLogout} />;
      case 'profile':
        return <UserProfileForm onComplete={handleProfileComplete} />;
      default:
        return (
          <Auth 
            onAuthSuccess={handleAuthSuccess}
            onNavigateToProfile={handleNavigateToProfile}
          />
        );
    }
  };

  return (
    <div className="App">
      {renderPage()}
    </div>
  );
}

export default App;
