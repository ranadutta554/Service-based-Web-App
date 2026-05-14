import React from "react";
import "./SiteMap.css";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope
} from "react-icons/fa";

const SiteMap = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Company Info */}
        <div className="footer-section">
          <h2 className="footer-logo">YourCompany</h2>
          <p className="footer-description">
            We provide high-quality digital services to help your business grow
            faster and smarter in the modern world.
          </p>

          <div className="social-icons">
            <a href="#" className="facebook"><FaFacebookF /></a>
            <a href="#" className="instagram"><FaInstagram /></a>
            <a href="#" className="linkedin"><FaLinkedinIn /></a>
            <a href="#" className="twitter"><FaTwitter /></a>
            <a href="#" className="whatsapp"><FaWhatsapp /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>About Us</li>
            <li>Services</li>
            <li>Projects</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h3>Contact</h3>
          <ul className="contact-info">
            <li><FaMapMarkerAlt /> Kolkata, India</li>
            <li><FaPhoneAlt /> +91 9876543210</li>
            <li><FaEnvelope /> info@yourcompany.com</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-section">
          <h3>Subscribe</h3>
          <p className="newsletter-text">
            Get latest updates and offers.
          </p>
          <div className="newsletter-box">
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} YourCompany. All rights reserved.
      </div>
    </footer>
  );
};

export default SiteMap;