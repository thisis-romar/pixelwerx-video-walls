import React from 'react';
import './Portfolio.css';

const Portfolio = () => {
  const projects = [
    {
      id: 1,
      title: "Ultra Music Festival",
      category: "Festival",
      description: "120-panel main stage installation with synchronized visuals",
      stats: {
        panels: 120,
        size: "30x4 configuration",
        audience: "175,000 attendees"
      },
      image: "/api/placeholder/600/400",
      tags: ["EDM", "Festival", "Outdoor"]
    },
    {
      id: 2,
      title: "Red Bull Arena Concert",
      category: "Concert",
      description: "360-degree immersive video wall experience",
      stats: {
        panels: 84,
        size: "Circular 28x3",
        audience: "25,000 capacity"
      },
      image: "/api/placeholder/600/400",
      tags: ["Concert", "Indoor", "Immersive"]
    },
    {
      id: 3,
      title: "Coachella Valley",
      category: "Festival",
      description: "Multi-stage video wall deployment with live streaming",
      stats: {
        panels: 200,
        size: "Multiple configs",
        audience: "250,000+ weekend"
      },
      image: "/api/placeholder/600/400",
      tags: ["Festival", "Multi-stage", "Live Stream"]
    },
    {
      id: 4,
      title: "Apple Product Launch",
      category: "Corporate",
      description: "High-resolution presentation wall for product reveals",
      stats: {
        panels: 48,
        size: "16x3 configuration",
        audience: "Executive presentation"
      },
      image: "/api/placeholder/600/400",
      tags: ["Corporate", "Product Launch", "High-res"]
    }
  ];

  return (
    <section id="portfolio" className="portfolio">
      <div className="container">
        <div className="section-header">
          <h2>Creative Installations That Move Audiences</h2>
          <p>Where art meets technology - our portfolio showcases breakthrough visual experiences</p>
        </div>
        
        <div className="portfolio-grid">
          {projects.map((project) => (
            <div key={project.id} className="portfolio-card">
              <div className="card-image">
                <img src={project.image} alt={project.title} />
                <div className="card-overlay">
                  <div className="card-category">{project.category}</div>
                </div>
              </div>
              
              <div className="card-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                
                <div className="project-stats">
                  <div className="stat">
                    <span className="stat-number">{project.stats.panels}</span>
                    <span className="stat-label">Panels</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">{project.stats.size}</span>
                    <span className="stat-label">Configuration</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">{project.stats.audience}</span>
                    <span className="stat-label">Reach</span>
                  </div>
                </div>
                
                <div className="project-tags">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="portfolio-stats">
          <div className="stat-item">
            <div className="stat-number">500+</div>
            <div className="stat-label">Events Powered</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">50M+</div>
            <div className="stat-label">Audience Reached</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">99.9%</div>
            <div className="stat-label">Uptime Rate</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Live Support</div>
          </div>
        </div>
        
        <div className="cta-section">
          <h3>Ready to Create Something Extraordinary?</h3>
          <p>Let's design a visual experience that your audience will never forget</p>
          <button className="btn-primary btn-large">START YOUR PROJECT</button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
