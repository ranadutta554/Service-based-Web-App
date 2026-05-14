import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FiMapPin, FiClock, FiCheckCircle, FiStar, FiArrowLeft } from "react-icons/fi";
import "./ServiceDetails.css";

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8086/myservice/service/${id}`)
      .then(res => setProviders(res.data))
      .catch(err => console.error("Fetch error:", err))
      .finally(() => setLoading(false));
  }, [id]);

  // ✅ UPDATED FUNCTION
const handleBooking = (providerId) => {
  const userData = localStorage.getItem("user");

  // ❌ Not logged in
  if (!userData) {
    alert("⚠️ Please login first to book a service");

    localStorage.setItem("redirectAfterLogin", `/booking/${providerId}`);

    window.dispatchEvent(new Event("openLoginModal"));
    return;
  }

  let user;
  try {
    user = JSON.parse(userData);
  } catch (e) {
    alert("Invalid user data, please login again");
    localStorage.removeItem("user");
    return;
  }

  // ❌ If user object broken
  if (!user) {
    alert("Please login again");
    return;
  }

  // 🔥 OPTIONAL (safe role check)
  if (user.role && user.role !== "USER") {
    alert("⚠️ Only users can book services");
    return;
  }

  // ✅ ALWAYS NAVIGATE
  console.log("Navigating to:", `/booking/${providerId}`);
  navigate(`/booking/${providerId}`);
};
  if (loading) return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p>Finding best providers...</p>
    </div>
  );

  return (
    <div className="details-page-wrapper">
      <div className="container">

        <header className="details-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <FiArrowLeft /> Back
          </button>

          <div className="title-section">
            <h1 className="main-title">Available Providers</h1>
            <p className="results-count">{providers.length} verified professionals found</p>
          </div>
        </header>

        {providers.length === 0 ? (
          <div className="empty-state">
            <img src="https://cdn-icons-png.flaticon.com/512/7486/7486744.png" alt="none" />
            <h3>No Providers Available</h3>
            <p>We couldn't find any service providers right now.</p>
          </div>
        ) : (
          <div className="providers-grid">
            {providers.map((p) => (
              <div key={p.id} className="provider-card">

                <div className="image-wrapper">
                  <img
                    src={`http://localhost:8086/images/${encodeURIComponent(p.imagePath)}`}
                    alt={p.providerName}
                    className="provider-img"
                  />
                  <div className="card-badge">
                    <FiStar /> 4.8
                  </div>
                </div>

                <div className="card-body">
                  <div className="provider-info-header">
                    <h2 className="service-name">{p.serviceName}</h2>
                    <span className="verified-icon">
                      <FiCheckCircle /> Verified
                    </span>
                  </div>

                  <p className="description-text">{p.description}</p>

                  <h4 className="provider-name-label">By {p.providerName}</h4>

                  <div className="info-grid">
                    <div className="info-item">
                      <FiMapPin className="icon" />
                      <span>{p.location}</span>
                    </div>
                    <div className="info-item">
                      <FiClock className="icon" />
                      <span>{p.workingTime}</span>
                    </div>
                  </div>

                  <div className="card-footer">
                    <div className="price-container">
                      <span className="price-label">Starting at</span>
                      <span className="price-value">₹{p.charge}</span>
                    </div>

                    <button
                      className="book-now-btn"
                      onClick={() => handleBooking(p.id)}
                    >
                      Book Now
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceDetails;