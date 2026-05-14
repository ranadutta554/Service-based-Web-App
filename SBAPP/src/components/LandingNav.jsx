import React, { useState, useEffect } from 'react';
import SignInModal from '../SignInModal';
import { useNavigate } from "react-router-dom";
import "./LandingNav.css";

const LandingNav = () => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");

  // scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // user
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  });

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  // ===== SCROLL FUNCTIONS =====
  const scrollToSection = (id) => {
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth"
      });
    }, 150);
  };

  const handleHomeClick = () => {
    setActive("home");

    if (window.location.pathname !== "/") {
      navigate("/");
      scrollToSection("home");
    } else {
      scrollToSection("home");
    }

    setMenuOpen(false);
  };

  const handleServicesClick = () => {
    setActive("services");

    if (window.location.pathname !== "/") {
      navigate("/");
      scrollToSection("services");
    } else {
      scrollToSection("services");
    }

    setMenuOpen(false);
  };

  return (
    <nav className={`nav-wrapper ${scrolled ? "is-scrolled" : ""}`}>
      <div className="nav-container">

        {/* LOGO */}
        <div className="nav-brand" onClick={handleHomeClick}>
          <div className="brand-icon"></div>
          <span>ULTRA</span>
        </div>

        {/* MENU */}
        <div className={`nav-menu ${menuOpen ? "active" : ""}`}>

          <button
            onClick={handleHomeClick}
            className={`nav-link-item ${active === "home" ? "active" : ""}`}
          >
            Home
          </button>

          <button
            onClick={handleServicesClick}
            className={`nav-link-item ${active === "services" ? "active" : ""}`}
          >
            Services
          </button>

          {user && (
            <button
              onClick={() =>
                navigate(user.role === "PROVIDER" ? "/dashboard" : "/user-profile")
              }
              className="nav-link-item"
            >
              Dashboard
            </button>
          )}
        </div>

        {/* ACTIONS */}
        <div className="nav-actions">

          {!user ? (
            <button className="login-trigger" onClick={() => setShowModal(true)}>
              Sign In
            </button>
          ) : (
            <div className="user-profile-stack">
              <div className="user-info">
                <span className="user-name">
                  {user.name?.split(" ")[0]}
                </span>
                <span className="user-status">Online</span>
              </div>

              <button className="nav-logout-btn" onClick={handleLogout}>
                ⎋
              </button>
            </div>
          )}

          {/* MOBILE MENU */}
          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <div></div>
            <div></div>
            <div></div>
          </div>

        </div>
      </div>

      {showModal && (
        <SignInModal closeModal={() => setShowModal(false)} setUser={setUser} />
      )}
    </nav>
  );
};

export default LandingNav;