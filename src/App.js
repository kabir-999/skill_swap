import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './pages/LoginPage/Auth';
import HomePage from './pages/HomePage/HomePage';
import UserProfileForm from './pages/CreateProfilePage/UserProfileForm';
import RequestPage from './pages/RequestPage/RequestPage';
import ViewProfilePage from './pages/ViewProfilePage/ViewProfilePage';
import SwapRequestPage from './pages/RequestPage/SwapRequestPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/signup" element={<Auth isSignup={true} />} />
        <Route path="/profile" element={<UserProfileForm />} />
        <Route path="/request" element={<RequestPage />} />
        <Route path='/view-profile' element={<ViewProfilePage />} />
        <Route path="/swap-request" element={<SwapRequestPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
