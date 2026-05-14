import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

const UserBookings = () => {

  const [bookings, setBookings] = useState([]);
  const [prevBookings, setPrevBookings] = useState([]);

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const userEmail = user?.email;

  // ================= FETCH =================
  const fetchBookings = useCallback(() => {

    if (!userEmail) return;

    axios.get(`http://localhost:8086/booking/user/${userEmail}`)
      .then(res => {

        const newData = res.data || [];

        // 🔥 STATUS CHANGE NOTIFICATION
        newData.forEach(newBooking => {

          const oldBooking = prevBookings.find(
            b => b.id === newBooking.id
          );

          if (oldBooking && oldBooking.status !== newBooking.status) {

            setPopupMessage(
              `🔔 Your booking for ${newBooking.serviceName} is ${newBooking.status}`
            );

            setShowPopup(true);

            const audio = new Audio("/notification.mp3");
            audio.play().catch(() => {});

            setTimeout(() => setShowPopup(false), 4000);
          }
        });

        setPrevBookings(newData);
        setBookings(newData);

      })
      .catch(err => console.error(err));

  }, [userEmail, prevBookings]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  useEffect(() => {
    const interval = setInterval(fetchBookings, 5000);
    return () => clearInterval(interval);
  }, [fetchBookings]);

  return (
    <div>

      {/* 🔔 POPUP */}
      {showPopup && (
        <div className="popup">
          {popupMessage}
        </div>
      )}

      <h2>My Bookings</h2>

      <table>
        <thead>
          <tr>
            <th>Service</th>
            <th>Provider</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map(b => (
            <tr key={b.id}>
              <td>{b.serviceName}</td>
              <td>{b.providerName}</td>
              <td>{b.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default UserBookings;