import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import ViewProfilePage from './pages/ViewProfilePage/ViewProfilePage';
import RequestPage from './pages/RequestPage/RequestPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/view-profile" element={<ViewProfilePage />} />
      <Route path="/request" element={<RequestPage />} />
    </Routes>
  );
}

export default App;
