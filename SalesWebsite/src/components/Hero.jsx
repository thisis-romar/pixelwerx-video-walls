import React, { useEffect, useRef } from 'react';
import './Hero.css';

const Hero = () => {
  const videoRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    // Particle animation effect
    const createParticles = () => {
      const canvas = document.getElementById('particles-canvas');
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const particles = [];
      const particleCount = 100;
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          size: Math.random() * 3 + 1,
          color: Math.random() > 0.5 ? '#4A90C2' : '#F5A623'
        });
      }
      
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
          particle.x += particle.vx;
          particle.y += particle.vy;
          
          if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
          if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
          
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.shadowBlur = 20;
          ctx.shadowColor = particle.color;
          ctx.fill();
        });
        
        requestAnimationFrame(animate);
      };
      
      animate();
    };
    
    createParticles();
    
    // Resize handler
    const handleResize = () => {
      const canvas = document.getElementById('particles-canvas');
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="hero" className="hero" ref={heroRef}>
      <canvas id="particles-canvas" className="particles-canvas"></canvas>
      
      <div className="hero-background">
        <div className="video-overlay"></div>
      </div>
      
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            Professional LED Video Walls<br />
            <span className="highlight">For Every Production</span>
          </h1>
          
          <div className="hero-subtitle">
            <span className="subtitle-item">Concert Grade</span>
            <span className="separator">•</span>
            <span className="subtitle-item">Studio Quality</span>
            <span className="separator">•</span>
            <span className="subtitle-item">Transparent Pricing</span>
          </div>
          
          <p className="hero-description">
            Power your events with industry-leading LED video walls trusted by touring 
            productions, festivals, and corporate events worldwide. Professional equipment, 
            expert technical support, and seamless installation services.
          </p>
          
          <div className="competitive-advantages">
            <div className="advantage-item">
              <span className="advantage-icon">🎬</span>
              <span>Broadcast & Production Ready</span>
            </div>
            <div className="advantage-item">
              <span className="advantage-icon">�</span>
              <span>Concert Touring Approved</span>
            </div>
            <div className="advantage-item">
              <span className="advantage-icon">⚡</span>
              <span>Real-Time Configuration</span>
            </div>
            <div className="advantage-item">
              <span className="advantage-icon">🔧</span>
              <span>Professional Installation</span>
            </div>
          </div>
          
          <div className="hero-cta">
            <button className="btn-primary btn-large">
              GET PROFESSIONAL QUOTE
            </button>
            <button className="btn-secondary">
              VIEW PORTFOLIO
            </button>
          </div>
          
          <div className="pricing-preview">
            <span className="pricing-label">Professional Rates From</span>
            <span className="pricing-amount">$4,500/day</span>
            <span className="pricing-note">• All-Inclusive • Technical Support</span>
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="floating-specs">
            <div className="spec-item">
              <span className="spec-number">36</span>
              <span className="spec-label">Premium Panels</span>
            </div>
            <div className="spec-item">
              <span className="spec-number">4K</span>
              <span className="spec-label">Ultra Resolution</span>
            </div>
            <div className="spec-item">
              <span className="spec-number">24/7</span>
              <span className="spec-label">Support</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="scroll-indicator">
        <div className="scroll-arrow"></div>
        <span>Scroll to Explore</span>
      </div>
    </section>
  );
};

export default Hero;
