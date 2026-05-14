import React, { useState, useEffect } from 'react';
import "./Carousel.css";

const slideData = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070", 
    badge: "5-Star Rated Service",
    title: "Luxury Home Cleaning",
    description: "Detail-oriented professionals dedicated to making your living space pristine and healthy.",
    color: "#818cf8"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1558227691-41ea78d1f631?q=80&w=1974",
    badge: "Licensed & Insured",
    title: "Precision Electrical",
    description: "Smart home integration and expert repairs delivered with safety-first precision.",
    color: "#fbbf24"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1585938389612-a552a28d6914?q=80&w=2060",
    badge: "Available 24/7",
    title: "Modern Plumbing",
    description: "From emergency repairs to designer installations, we keep your home running smoothly.",
    color: "#38bdf8"
  }
];

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % slideData.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const current = slideData[activeIndex];

  return (
    <section id="home" className="modern-hero" style={{ '--accent-glow': current.color }}>
      <div className="mesh-gradient"></div>
      
      <div className="hero-grid">
        <div className="hero-text-content">
          <div className="badge-container" key={`badge-${current.id}`}>
            <span className="pill-badge">{current.badge}</span>
          </div>
          
          <h1 className="hero-heading" key={`title-${current.id}`}>
            {current.title}
          </h1>
          
          <p className="hero-subtext" key={`desc-${current.id}`}>
            {current.description}
          </p>

          <div className="hero-actions">
           
          </div>

          <div className="modern-indicators">
            {slideData.map((_, index) => (
              <button 
                key={index}
                className={`indicator-dot ${index === activeIndex ? 'active' : ''}`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>

        <div className="hero-visual-section">
          <div className="image-frame" key={`img-${current.id}`}>
            <img src={current.image} alt={current.title} className="main-hero-img" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Carousel;