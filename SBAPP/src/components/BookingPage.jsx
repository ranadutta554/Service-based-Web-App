import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { 
  FiMapPin, FiPhone, FiCalendar, FiCheckCircle, 
  FiChevronRight, FiAlertCircle, FiShield, FiArrowLeft, FiInfo
} from "react-icons/fi";
import "./Bookingpage.css";

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Initialize user from localStorage safely
  const [user] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (err) {
      console.error("Error parsing user from storage:", err);
      return null;
    }
  });

  const [service, setService] = useState(null);
  const [step, setStep] = useState(1);
  const [bookingId, setBookingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    address: "",
    phone: "",
    notes: "",
    scheduledDate: ""
  });

  // Fetch service details based on URL ID
  const fetchService = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:8086/myservice/get/${id}`);
      setService(res.data);
    } catch (err) {
      console.error("Error fetching service:", err);
      setError("Failed to load service details. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [id]);

 useEffect(() => {
  if (!user) {
    setError("Please login first to book a service 🔒");

    setTimeout(() => {
      navigate("/SignInModal");
    }, 1500); // small delay so user can read message

    return;
  }
  fetchService();
}, [user, navigate, fetchService]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError(""); // Clear error when user types
  };

  const validate = () => {
    if (!formData.address || !formData.phone || !formData.scheduledDate) {
      return "All fields are required";
    }
    if (!/^\d{10}$/.test(formData.phone)) {
      return "Please enter a valid 10-digit phone number";
    }
    if (new Date(formData.scheduledDate) < new Date()) {
      return "Scheduled date cannot be in the past";
    }
    return null;
  };

  const proceedToConfirm = () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
    } else {
      setStep(2);
    }
  };

  const executeBooking = async () => {
    setSubmitting(true);
    setError("");
    try {
      const payload = {
  ...formData,

  // ✅ USER DATA
  userEmail: user.email,
  userName: user.name,   // 🔥 ADD THIS (IMPORTANT)

  // ✅ PROVIDER DATA
  providerEmail: service.providerEmail,
  providerName: service.providerName,

  // ✅ SERVICE DATA
  serviceId: service.serviceId,
  serviceName: service.serviceName,

  // ✅ OTHER
  price: service.charge,
  location: service.location
};

      const res = await axios.post("http://localhost:8086/booking/add", payload);
      setBookingId(res.data.id);
      setStep(3);
    } catch (err) {
      console.error("Booking submission error:", err);
      setError("Booking failed. Our server might be busy. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="loader-overlay">
        <div className="spinner"></div>
        <p>Loading service details...</p>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="error-screen">
        <FiAlertCircle size={48} />
        <h2>Service Not Found</h2>
        <button onClick={() => navigate("/")}>Go Back Home</button>
      </div>
    );
  }

  return (
    <div className="booking-layout">
      <div className="booking-container">
        
        <main className="booking-main">
          {/* PROGRESS STEPPER */}
          <nav className="stepper">
            <div className={`step-item ${step >= 1 ? "active" : ""}`}>Details</div>
            <FiChevronRight className="step-sep" />
            <div className={`step-item ${step >= 2 ? "active" : ""}`}>Confirm</div>
            <FiChevronRight className="step-sep" />
            <div className={`step-item ${step === 3 ? "active" : ""}`}>Done</div>
          </nav>

          {error && (
            <div className="error-banner">
              <FiAlertCircle /> {error}
            </div>
          )}

          {/* STEP 1: INPUT DETAILS */}
          {step === 1 && (
            <div className="form-fade-in">
              <h2>Service Details</h2>
              <div className="input-group">
                <label htmlFor="address"><FiMapPin /> Work Address</label>
                <input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter the full address"
                />
              </div>

              <div className="input-row">
                <div className="input-group">
                  <label htmlFor="phone"><FiPhone /> Contact Number</label>
                  <input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="10 digit number"
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="scheduledDate"><FiCalendar /> Preferred Date</label>
                  <input
                    id="scheduledDate"
                    name="scheduledDate"
                    type="datetime-local"
                    value={formData.scheduledDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <button className="primary-btn" onClick={proceedToConfirm}>
                Review & Confirm <FiChevronRight />
              </button>
            </div>
          )}

          {/* STEP 2: CONFIRMATION */}
          {step === 2 && (
            <div className="form-fade-in">
              <h2>Review Booking</h2>
              <div className="summary-box">
                <p><strong>Address:</strong> {formData.address}</p>
                <p><strong>Time:</strong> {new Date(formData.scheduledDate).toLocaleString()}</p>
                <p><strong>Contact:</strong> {formData.phone}</p>
              </div>

              <div className="input-group">
                <label htmlFor="notes"><FiInfo /> Special Instructions (Optional)</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Add any specific details the service provider should know..."
                />
              </div>

              <div className="button-group">
                <button className="ghost-btn" onClick={() => setStep(1)}>
                  <FiArrowLeft /> Back
                </button>
                <button className="primary-btn" onClick={executeBooking} disabled={submitting}>
                  {submitting ? "Processing..." : "Confirm Booking"}
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: SUCCESS */}
          {step === 3 && (
            <div className="success-screen">
              <FiCheckCircle className="success-icon" />
              <h2>Booking Confirmed!</h2>
              <p>Your booking ID is <strong>#{bookingId}</strong>.</p>
              <p>You can track the status in your dashboard.</p>
              <button className="primary-btn" onClick={() => navigate("/my-bookings")}>
                View My Bookings
              </button>
            </div>
          )}
        </main>

        {/* SIDEBAR SUMMARY */}
        <aside className="booking-sidebar">
          <div className="service-card-mini">
            <img 
              src={`http://localhost:8086/images/${service.imagePath}`} 
              alt={service.serviceName} 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/400x250?text=Service+Image";
              }}
            />
            <div className="mini-details">
              <h3>{service.serviceName}</h3>
              <p className="price-tag">₹{service.charge}</p>
              <div className="secure-note"><FiShield /> Secure Transaction</div>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
};

export default BookingPage;