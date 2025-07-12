import React from 'react';
import './RequestPage.css';

function RequestPage() {
  return (
    <div className="requestpage-container">
      <header className="request-navbar">
        <img src="/logo.jpg" alt="Logo" className="navbar-logo-img" />
        <nav className="request-navlinks">
          <a href="#swap">Swap Request</a>
          <a href="#home">Home</a>
        </nav>
        <div className="request-avatar-placeholder" />
      </header>
      <main className="request-main">
        <form className="request-form">
          <label className="request-label">Choose one of your offered skill</label>
          <select className="request-select">
            <option>Python</option>
            <option>JavaScript</option>
            <option>Figma</option>
          </select>

          <label className="request-label">Choose one of their wanted skill</label>
          <select className="request-select">
            <option>HTML</option>
            <option>CSS</option>
            <option>Mummy</option>
          </select>

          <label className="request-label">Message</label>
          <textarea className="request-textarea" rows={5} />

          <button className="request-submit-btn" type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}

export default RequestPage;
