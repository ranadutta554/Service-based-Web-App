import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiChevronRight, FiGrid, FiTool } from "react-icons/fi"; // Install react-icons
import "./PopularServices.css";

const PopularServices = () => {
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Category Fetch
useEffect(() => {
  axios.get("http://localhost:8086/api/fetch")
    .then(res => {
      setCategories(res.data);
      if (res.data.length > 0) handleCategoryClick(res.data[0].cid);
    })
    .catch(err => {
      console.error("Failed to load categories:", err); // 'err' is now used
    });
}, []);

// ✅ Services Fetch
const handleCategoryClick = async (cid) => {
  setActiveCategory(cid);
  setLoading(true);
  try {
    const res = await axios.get(`http://localhost:8086/service/category/${cid}`);
    setServices(res.data);
  } catch (err) {
    console.error("Failed to load services:", err); // 'err' is now used
    setServices([]);
  } finally {
    setLoading(false);
  }
};


  return (
    <section className="services-explorer">
      <div className="container">
        <div className="header-flex">
          <div className="title-group">
            <span className="subtitle">What do you need help with?</span>
            <h2 className="main-title">Popular Services</h2>
          </div>
          <button className="view-all-btn">Explore All <FiGrid /></button>
        </div>

        <div className="explorer-grid">
          {/* LEFT: Category Navigation */}
          <aside className="category-sidebar">
            {categories.map((cat) => (
              <button
                key={cat.cid}
                className={`category-pill ${activeCategory === cat.cid ? "active" : ""}`}
                onClick={() => handleCategoryClick(cat.cid)}
              >
                <span className="pill-text">{cat.cname}</span>
                <FiChevronRight className="arrow-icon" />
              </button>
            ))}
          </aside>

          {/* RIGHT: Services Display */}
          <main className="services-display">
            {loading ? (
              <div className="skeleton-grid">
                {[1, 2, 3, 4].map(n => <div key={n} className="skeleton-card"></div>)}
              </div>
            ) : (
              <div className="services-layout">
                {services.length > 0 ? (
                  services.map((service) => (
                    <div
                      key={service.serviceId}
                      className="modern-service-card"
                      onClick={() => navigate(`/services/${service.serviceId}`)}
                    >
                      <div className="service-icon-box">
                        <FiTool />
                      </div>
                      <div className="service-info">
                        <h3>{service.serviceName}</h3>
                        <p>Professional help in your area</p>
                      </div>
                      <div className="service-action">
                        <span className="price-tag">Book Now</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-state">
                    <p>Select a category to see available services</p>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </section>
  );
};

export default PopularServices;