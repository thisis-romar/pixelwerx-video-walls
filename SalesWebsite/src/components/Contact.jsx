import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    eventType: '',
    timeline: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-header">
          <h2>Let's Create Something Extraordinary Together</h2>
          <p>Ready to bring your vision to life? Our team is standing by to make it happen.</p>
        </div>
        
        <div className="contact-container">
          <div className="contact-info">
            <h3>Get In Touch</h3>
            
            <div className="contact-methods">
              <div className="contact-method">
                <div className="method-icon">📞</div>
                <div className="method-content">
                  <h4>Emergency Hotline</h4>
                  <p>24/7 Support for Live Events</p>
                  <a href="tel:+1-888-PIXELWERX" className="contact-link">
                    +1 (888) PIXEL-WRX
                  </a>
                </div>
              </div>
              
              <div className="contact-method">
                <div className="method-icon">✉️</div>
                <div className="method-content">
                  <h4>Project Inquiries</h4>
                  <p>Get detailed quotes & technical specs</p>
                  <a href="mailto:events@pixelwerx.com" className="contact-link">
                    events@pixelwerx.com
                  </a>
                </div>
              </div>
              
              <div className="contact-method">
                <div className="method-icon">🚀</div>
                <div className="method-content">
                  <h4>Rush Orders</h4>
                  <p>Same-day deployment available</p>
                  <a href="tel:+1-888-RUSH-PWX" className="contact-link">
                    +1 (888) RUSH-PWX
                  </a>
                </div>
              </div>
            </div>
            
            <div className="response-times">
              <h4>Response Times</h4>
              <div className="time-list">
                <div className="time-item">
                  <span className="time-type">Quote Requests</span>
                  <span className="time-value">&lt; 2 Hours</span>
                </div>
                <div className="time-item">
                  <span className="time-type">Emergency Support</span>
                  <span className="time-value">&lt; 15 Minutes</span>
                </div>
                <div className="time-item">
                  <span className="time-type">Technical Questions</span>
                  <span className="time-value">&lt; 30 Minutes</span>
                </div>
              </div>
            </div>
            
            <div className="trust-indicators">
              <h4>Why Creative Teams Choose Us</h4>
              <div className="indicators">
                <div className="indicator">✓ Instant transparent pricing</div>
                <div className="indicator">✓ Same-day deployment capability</div>
                <div className="indicator">✓ 24/7 live event support</div>
                <div className="indicator">✓ Creative-first approach</div>
                <div className="indicator">✓ No corporate bureaucracy</div>
              </div>
            </div>
          </div>
          
          <div className="contact-form">
            <form onSubmit={handleSubmit}>
              <h3>Start Your Project</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your full name"
                  />
                </div>
                
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Company / Event</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Company or Event Name"
                  />
                </div>
                
                <div className="form-group">
                  <label>Event Type</label>
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                  >
                    <option value="">Select event type</option>
                    <option value="festival">Music Festival</option>
                    <option value="concert">Concert / Tour</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="art">Art Installation</option>
                    <option value="other">Other Creative Event</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label>Timeline</label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                >
                  <option value="">When do you need this?</option>
                  <option value="emergency">Emergency (Today/Tomorrow)</option>
                  <option value="rush">Rush (This Week)</option>
                  <option value="standard">Standard (2-4 Weeks)</option>
                  <option value="planning">Planning (1+ Months)</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Project Details</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  placeholder="Tell us about your vision, audience size, venue details, technical requirements, or any special creative requests..."
                ></textarea>
              </div>
              
              <button type="submit" className="btn-primary btn-large">
                GET INSTANT QUOTE
              </button>
              
              <p className="form-note">
                * Emergency requests: Call our hotline for immediate assistance
              </p>
            </form>
          </div>
        </div>
        
        <div className="competitive-advantage">
          <h3>The PixelWerx Difference</h3>
          <div className="advantage-grid">
            <div className="advantage-item">
              <h4>Speed & Transparency</h4>
              <p>Instant pricing, fast deployment. No corporate delays or hidden quotes.</p>
            </div>
            <div className="advantage-item">
              <h4>Creative Focus</h4>
              <p>Built specifically for artists, festivals, and creative events.</p>
            </div>
            <div className="advantage-item">
              <h4>Live Event Expertise</h4>
              <p>24/7 on-site support from technicians who understand live production.</p>
            </div>
            <div className="advantage-item">
              <h4>Cutting-Edge Tech</h4>
              <p>Latest LED technology with AR preview and real-time configuration.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
