import React, { useState } from 'react';
import './PricingCalculator.css';

const PricingCalculator = () => {
  const [eventType, setEventType] = useState('festival');
  const [panelCount, setPanelCount] = useState(12);
  const [duration, setDuration] = useState(1);
  
  const basePrices = {
    corporate: 500,
    festival: 400,
    concert: 450
  };
  
  const calculatePrice = () => {
    const basePrice = basePrices[eventType];
    const totalPrice = basePrice * panelCount * duration;
    return totalPrice;
  };

  return (
    <section id="pricing" className="pricing-calculator">
      <div className="container">
        <div className="section-header">
          <h2>Transparent Pricing - No Hidden Quotes</h2>
          <p>Major differentiator vs quote-only competitors</p>
        </div>
        
        <div className="calculator-container">
          <div className="calculator-form">
            <h3>Real-Time Pricing Calculator</h3>
            
            <div className="form-group">
              <label>Event Type</label>
              <select value={eventType} onChange={(e) => setEventType(e.target.value)}>
                <option value="festival">Festival / Outdoor</option>
                <option value="concert">Concert / Indoor</option>
                <option value="corporate">Corporate Event</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Number of Panels: {panelCount}</label>
              <input 
                type="range" 
                min="6" 
                max="36" 
                value={panelCount}
                onChange={(e) => setPanelCount(parseInt(e.target.value))}
                className="slider"
              />
            </div>
            
            <div className="form-group">
              <label>Duration (Days): {duration}</label>
              <input 
                type="range" 
                min="1" 
                max="7" 
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value))}
                className="slider"
              />
            </div>
            
            <div className="pricing-result">
              <div className="price-breakdown">
                <div className="breakdown-item">
                  <span>Base Rate ({eventType})</span>
                  <span>${basePrices[eventType]}/panel/day</span>
                </div>
                <div className="breakdown-item">
                  <span>Panels × Days</span>
                  <span>{panelCount} × {duration}</span>
                </div>
                <div className="breakdown-total">
                  <span>Total Price</span>
                  <span className="total-amount">${calculatePrice().toLocaleString()}</span>
                </div>
              </div>
              
              <div className="pricing-advantages">
                <div className="advantage">✓ No hidden fees</div>
                <div className="advantage">✓ Includes setup & support</div>
                <div className="advantage">✓ Transparent pricing</div>
              </div>
              
              <button className="btn-primary btn-large">GET DETAILED QUOTE</button>
            </div>
          </div>
          
          <div className="pricing-comparison">
            <h3>Compare to Enterprise Quotes</h3>
            <div className="comparison-table">
              <div className="comparison-row">
                <span>PixelWerx</span>
                <span className="price-good">${calculatePrice().toLocaleString()}</span>
              </div>
              <div className="comparison-row">
                <span>Enterprise Competitor</span>
                <span className="price-bad">Quote Required</span>
              </div>
              <div className="comparison-row">
                <span>Time to Pricing</span>
                <span className="time-good">Instant</span>
              </div>
              <div className="comparison-row">
                <span>Enterprise Process</span>
                <span className="time-bad">2-5 Days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingCalculator;
