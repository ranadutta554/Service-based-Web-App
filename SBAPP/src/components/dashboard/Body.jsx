import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./Body.css";

const Body = ({ setNotificationCount, showNotifications }) => {

  const [bookings, setBookings] = useState([]);
  const [intervalTime, setIntervalTime] = useState(5000);
  const [loading, setLoading] = useState(true);

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const userEmail = user?.email;
  const userName = user?.name || "Provider";

  // ================= POPUP =================
  const triggerPopup = (msg) => {
    setPopupMessage(msg);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2500);
  };

  // ================= FETCH BOOKINGS =================
  const fetchBookings = useCallback(async () => {
    if (!userEmail) return;

    try {
      const res = await axios.get(
        `http://localhost:8086/booking/provider/${userEmail}`
      );

      const data = res.data || [];

      // notifications
      data.forEach(b => {
        if (b.status === "PENDING") {
          setNotificationCount(prev => prev + 1);
        }
      });

      // sorting
      const sorted = [...data].sort((a, b) => {
        if (a.status === "PENDING" && b.status !== "PENDING") return -1;
        if (a.status !== "PENDING" && b.status === "PENDING") return 1;
        return b.id - a.id;
      });

      setBookings(sorted);
      setLoading(false);

      // smart interval
      const hasPending = data.some(b => b.status === "PENDING");
      setIntervalTime(hasPending ? 3000 : 7000);

    } catch (err) {
      console.error(err);
    }
  }, [userEmail, setNotificationCount]);

  // ================= DELETE =================
 const deleteBooking = async (id) => {
  if (!window.confirm("Delete this booking?")) return;

  try {
    await axios.post(`http://localhost:8086/booking/cancel/${id}`);

    setBookings(prev => prev.filter(b => b.id !== id)); // instant UI

    triggerPopup("🗑 Deleted successfully");
  } catch (err) {
    console.error(err);
    triggerPopup("❌ Delete failed");
  }
};

  // ================= UPDATE =================
  const updateStatus = async (id, status) => {
    try {
      axios.put(
  `http://localhost:8086/booking/status/${id}?status=${status}`
);

      triggerPopup(`Booking ${status} ✅`);
      fetchBookings();
    } catch (err) {
      console.error(err);
    }
  };

  // ================= SINGLE POLLING =================
  useEffect(() => {
  let cancelled = false;

  const run = async () => {
    if (cancelled) return;
    await fetchBookings();
  };

  // initial load
  run();

  const interval = setInterval(run, intervalTime);

  return () => {
    cancelled = true;
    clearInterval(interval);
  };
}, [fetchBookings, intervalTime]);

  return (
    <div className="body">

      {showPopup && <div className="popup">{popupMessage}</div>}

      <h2 className="title">👋 Welcome, {userName}</h2>

      {/* 📊 CARDS */}
      <div className="cards">
        <div className="card">Total <span>{bookings.length}</span></div>
        <div className="card pending">
          Pending <span>{bookings.filter(b => b.status === "PENDING").length}</span>
        </div>
        <div className="card accepted">
          Accepted <span>{bookings.filter(b => b.status === "ACCEPTED").length}</span>
        </div>
        <div className="card cancelled">
          Cancelled <span>{bookings.filter(b => b.status === "CANCELLED").length}</span>
        </div>
      </div>

      {/* 🔔 NOTIFICATION */}
      {showNotifications && (
        <div className="notification-panel">
          <h3>🔔 Live Requests</h3>

          {bookings.filter(b => b.status === "PENDING").length === 0 ? (
            <p>No new bookings</p>
          ) : (
            bookings
              .filter(b => b.status === "PENDING")
              .slice(0, 5)
              .map(b => (
                <div key={b.id} className="notification-item">
                  <p><b>{b.userName}</b> → {b.serviceName}</p>

                  <div className="actions">
                    <button
                      className="accept"
                      onClick={() => updateStatus(b.id, "ACCEPTED")}
                    >✔</button>

                    <button
                      className="cancel"
                      onClick={() => updateStatus(b.id, "CANCELLED")}
                    >✖</button>
                  </div>
                </div>
              ))
          )}
        </div>
      )}

      {/* 📋 TABLE */}
      {loading ? (
        <p className="loading">Loading...</p>
      ) : bookings.length === 0 ? (
        <p className="empty">No bookings yet</p>
      ) : (
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Service</th>
                <th>User</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map(b => (
                <tr key={b.id}>
                  <td>{b.serviceName}</td>

                  <td>
                    <div className="user-cell">
                      <div className="avatar">
                        {b.userName?.charAt(0).toUpperCase()}
                      </div>
                      {b.userName}
                    </div>
                  </td>

                  <td>
                    <span className={`status ${b.status.toLowerCase()}`}>
                      {b.status}
                    </span>
                  </td>

                  <td className="actions">
                    {b.status === "PENDING" && (
                      <>
                        <button
                          className="accept"
                          onClick={() => updateStatus(b.id, "ACCEPTED")}
                        >✔</button>

                        <button
                          className="cancel"
                          onClick={() => updateStatus(b.id, "CANCELLED")}
                        >✖</button>
                      </>
                    )}

                    <button
                      className="delete"
                      onClick={() => deleteBooking(b.id)}
                    >🗑</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};

export default Body;