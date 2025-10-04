import React from 'react';
import Hero from './components/Hero';
import Navigation from './components/Navigation';
import Solutions from './components/Solutions';
import Portfolio from './components/Portfolio';
import PricingCalculator from './components/PricingCalculator';
import Contact from './components/Contact';
import './styles/design-system.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Hero />
      <Solutions />
      <PricingCalculator />
      <Portfolio />
      <Contact />
    </div>
  );
}

export default App;
