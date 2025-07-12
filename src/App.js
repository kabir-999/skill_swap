import React, { useState, useEffect } from 'react';
import './App.css';
import Auth from './pages/LoginPage/Auth';
import HomePage from './pages/HomePage/HomePage';
import UserProfileForm from './pages/CreateProfilePage/UserProfileForm';

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'auth', 'profile'
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [, setUser] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
      setCurrentPage('home');
    }
  }, []);

  const handleAuthSuccess = () => {
    const savedUser = localStorage.getItem('user');
    setUser(JSON.parse(savedUser));
    setIsLoggedIn(true);
    setCurrentPage('home');
  };

  const handleNavigateToProfile = () => {
    setCurrentPage('profile');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsLoggedIn(false);
    setCurrentPage('home');
  };

  const handleProfileComplete = () => {
    setCurrentPage('home');
    setIsLoggedIn(true);
  };

  const handleShowLogin = () => {
    setCurrentPage('auth');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onLoginClick={handleShowLogin} onLogout={handleLogout} isLoggedIn={isLoggedIn} />;
      case 'auth':
        return (
          <Auth 
            onAuthSuccess={handleAuthSuccess}
            onNavigateToProfile={handleNavigateToProfile}
          />
        );
      case 'profile':
        return <UserProfileForm onComplete={handleProfileComplete} />;
      default:
        return <HomePage onLoginClick={handleShowLogin} onLogout={handleLogout} isLoggedIn={isLoggedIn} />;
    }
  };

  return (
    <div className="App">
      {renderPage()}
    </div>
  );
}

export default App;
