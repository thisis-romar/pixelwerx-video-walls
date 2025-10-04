import React from 'react';
import './Solutions.css';

const Solutions = () => {
  return (
    <section id="solutions" className="solutions">
      <div className="container">
        <div className="section-header">
          <h2>Creative Event Solutions</h2>
          <p>Specialized expertise vs generic AV solutions</p>
        </div>
        
        <div className="solutions-grid">
          <div className="solution-card">
            <div className="solution-icon">🏢</div>
            <h3>Corporate Events That Stand Out</h3>
            <p>Elevate presentations with cutting-edge technology that impresses</p>
            <div className="solution-advantage">Creative edge vs traditional corporate AV</div>
          </div>
          
          <div className="solution-card">
            <div className="solution-icon">🎪</div>
            <h3>Festival Main Stage Magic</h3>
            <p>Create unforgettable moments with massive LED displays that move crowds</p>
            <div className="solution-advantage">Specialized festival expertise vs generic event coverage</div>
          </div>
          
          <div className="solution-card">
            <div className="solution-icon">🎸</div>
            <h3>Concert Visual Spectacle</h3>
            <p>Amplify the experience with dynamic visual storytelling and artist collaboration</p>
            <div className="solution-advantage">Music industry focus vs corporate-only positioning</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solutions;
