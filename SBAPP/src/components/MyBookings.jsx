import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
  FiSearch, FiCalendar, FiMapPin, FiTrash2,
  FiClock, FiCheckCircle, FiAlertCircle
} from "react-icons/fi";
import "./MyBookings.css";

const MyBookings = () => {

  const [user] = useState(() =>
    JSON.parse(localStorage.getItem("user") || "null")
  );

  const [bookings, setBookings] = useState([]);
  const [serviceMap, setServiceMap] = useState({});
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH BOOKINGS
  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const [bookingsRes, servicesRes] = await Promise.all([
          axios.get(`http://localhost:8086/booking/user/${user.email}`),
          axios.get("http://localhost:8086/myservice/all")
        ]);

        setBookings(bookingsRes.data);

        // map services
        const map = {};
        servicesRes.data.forEach(s => {
          map[s.serviceId] = s;
        });
        setServiceMap(map);

      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  // 🔥 CANCEL BOOKING (UPDATED)
  const cancelBooking = async (booking) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      await axios.post(
  `http://localhost:8086/booking/cancel/${booking.id}`
);

      // ✅ Update UI instantly
      setBookings(prev =>
        prev.map(b =>
          b.id === booking.id ? { ...b, status: "CANCELLED" } : b
        )
      );

      alert("Booking cancelled successfully 🚫");

    } catch (err) {
      console.error("Cancel Error:", err);
      alert("Failed to cancel booking ❌");
    }
  };

  // 🔥 FILTER LOGIC
  const filteredBookings = useMemo(() => {
    return bookings
      .filter(b => filter === "ALL" || (b.status || "") === filter)
      .filter(b => {
        const name = (
          b.serviceName ||
          serviceMap[b.serviceId]?.serviceName ||
          ""
        ).toLowerCase();

        return name.includes(search.toLowerCase());
      });
  }, [bookings, serviceMap, filter, search]);

  // 🔥 STEP TRACKING
  const getStep = (status) => {
    const s = status?.toUpperCase();
    if (s === "PENDING") return 1;
    if (s === "ACCEPTED") return 2;
    if (s === "COMPLETED") return 3;
    return 0;
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="mybookings-container">

      {/* HEADER */}
      <header className="booking-header">
        <div className="title-section">
          <h2>My Bookings</h2>
          <p>Track and manage your bookings</p>
        </div>

        <div className="search-wrapper">
          <FiSearch className="search-icon" />
          <input
            className="search-box"
            placeholder="Search service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>

      {/* FILTERS */}
      <div className="filters">
        {["ALL", "PENDING", "ACCEPTED", "COMPLETED", "CANCELLED"].map(f => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* BOOKINGS */}
      <div className="bookings-grid">
        {filteredBookings.map(b => {

          const status = b.status || "UNKNOWN";
          const step = getStep(status);
          const service = serviceMap[b.serviceId];

          return (
            <div key={b.id} className="booking-card">

              {/* IMAGE */}
              <div className="card-image">
                <img
                  src={
                    service?.imagePath
                      ? `http://localhost:8086/images/${service.imagePath}`
                      : "https://placehold.co/400x250"
                  }
                  alt="service"
                />
                <span className={`status-badge ${status.toLowerCase()}`}>
                  {status}
                </span>
              </div>

              {/* CONTENT */}
              <div className="booking-content">

                <h3>{b.serviceName || service?.serviceName}</h3>

                <div className="info-row">
                  <span className="price">
                    ₹{b.price || service?.charge || 0}
                  </span>

                  <span className="location">
                    <FiMapPin /> {b.location || "On-site"}
                  </span>
                </div>

                <p className="booking-date">
                  <FiCalendar />{" "}
                  {b.scheduledDate
                    ? new Date(b.scheduledDate).toLocaleString()
                    : "Not scheduled"}
                </p>

                {/* TRACKING */}
                <div className="tracking-bar">
                  <div className={`step ${step >= 1 ? "active" : ""}`}>
                    <FiClock /> <span>Pending</span>
                  </div>

                  <div className={`line ${step >= 2 ? "active" : ""}`}></div>

                  <div className={`step ${step >= 2 ? "active" : ""}`}>
                    <FiCheckCircle /> <span>Accepted</span>
                  </div>

                  <div className={`line ${step >= 3 ? "active" : ""}`}></div>

                  <div className={`step ${step >= 3 ? "active" : ""}`}>
                    <FiCheckCircle /> <span>Done</span>
                  </div>
                </div>

                {/* 🔥 CANCEL BUTTON FIX */}
                {["PENDING", "ACCEPTED"].includes(status) && (
                  <button
                    className="cancel-btn"
                    onClick={() => cancelBooking(b)}
                  >
                    <FiTrash2 /> Cancel
                  </button>
                )}

              </div>
            </div>
          );
        })}
      </div>

      {/* EMPTY */}
      {filteredBookings.length === 0 && (
        <div className="empty-state">
          <FiAlertCircle size={40} />
          <p>No bookings found</p>
        </div>
      )}

    </div>
  );
};

export default MyBookings;