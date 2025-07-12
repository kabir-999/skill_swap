import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Auth from './pages/LoginPage/Auth';
import HomePage from './pages/HomePage/HomePage';
import UserProfileForm from './pages/CreateProfilePage/UserProfileForm';
import RequestPage from './pages/RequestPage/RequestPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/signup" element={<Auth isSignup={true} />} />
      <Route path="/profile" element={<UserProfileForm />} />
      <Route path="/request" element={<RequestPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
