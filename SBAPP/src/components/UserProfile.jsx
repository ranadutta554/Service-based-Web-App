import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserProfile.css";
import { useNavigate } from "react-router-dom"; // ✅ added

const UserProfile = () => {

  const navigate = useNavigate(); // ✅ added

  // Initialize user from local storage
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  
  // Theme state
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") !== "light"; // Default to dark
  });

  // Form states
  const [image, setImage] = useState(user?.image || "");
  const [formData, setFormData] = useState({
    name: user?.name || "",
    contactno: user?.contactno || ""
  });

  const [passwordData, setPasswordData] = useState({
    oldPass: "",
    newPass: ""
  });

  // Apply Theme
  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Fetch Latest Profile
  useEffect(() => {
    if (!user?.email) return;
    axios.get(`http://localhost:8086/profile/${user.email}`)
      .then(res => {
        setUser(res.data);
        setFormData({
          name: res.data.name,
          contactno: res.data.contactno || ""
        });
        localStorage.setItem("user", JSON.stringify(res.data));
      })
      .catch(err => console.error("Profile fetch error", err));
  }, [user?.email]);

  // Fetch Bookings
  useEffect(() => {
    if (!user?.email) return;
    axios.get(`http://localhost:8086/booking/user/${user.email}`)
      .then(res => setBookings(res.data))
      .catch(err => console.error("Booking fetch error", err));
  }, [user?.email]);

  if (!user) return (
    <div className="auth-error">
      <h2>Access Denied</h2>
      <p>Please login to view your profile.</p>
      <button onClick={() => window.location.href = "/"}>Go Home</button>
    </div>
  );

  // Handlers
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    try {
      const res = await axios.put("http://localhost:8086/profile/update", {
        email: user.email,
        name: formData.name,
        contactno: formData.contactno,
        pass: user.pass // keeping existing pass
      });
      const updated = { ...res.data, image };
      setUser(updated);
      localStorage.setItem("user", JSON.stringify(updated));
      alert("Profile updated successfully! ✨");
    }  catch (err) {
      console.error("Update Error:", err);
      alert("Failed to update profile.");
    }
  };

  const handlePasswordUpdate = async () => {
    if (passwordData.oldPass !== user.pass) {
      alert("Current password is incorrect ❌");
      return;
    }
    if (!passwordData.newPass) {
      alert("Please enter a new password");
      return;
    }
    try {
      const res = await axios.put("http://localhost:8086/profile/update", {
        email: user.email,
        name: user.name,
        contactno: user.contactno,
        pass: passwordData.newPass
      });
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      setPasswordData({ oldPass: "", newPass: "" });
      alert("Password secured! 🔑");
    } catch (err) {
      console.error("Update Error:", err);
      alert("Failed to update profile.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className={`profile-root ${darkMode ? "dark" : "light"}`}>
      <div className="glass-canvas">
        
        {/* SIDEBAR NAVIGATION */}
        <aside className="profile-nav">
          <div className="nav-header">
            <div className="avatar-container">
              <div className="avatar-circle">
                {image ? <img src={image} alt="User" /> : user.name?.charAt(0)}
              </div>
              <label className="avatar-edit">
                <input type="file" onChange={handleImageUpload} hidden />
                <span>📷</span>
              </label>
            </div>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>

          <div className="nav-links">
            <button className={activeTab === "dashboard" ? "active" : ""} onClick={() => setActiveTab("dashboard")}>
              <span className="icon">📊</span> Dashboard
            </button>
            <button className={activeTab === "profile" ? "active" : ""} onClick={() => setActiveTab("profile")}>
              <span className="icon">👤</span> Edit Profile
            </button>
            <button className={activeTab === "password" ? "active" : ""} onClick={() => setActiveTab("password")}>
              <span className="icon">🔒</span> Password
            </button>

            {/* ✅ ONLY ADDED BUTTON */}
            <button onClick={() => navigate("/my-bookings")}>
              <span className="icon">📦</span> My Bookings
            </button>
          </div>

          <div className="nav-footer">
            <button className="toggle-theme" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="profile-body">
          
          {/* DASHBOARD TAB */}
          {activeTab === "dashboard" && (
            <div className="tab-view fade-in">
              <header className="view-header">
                <h1>Overview</h1>
                <p>Track your recent activities and service status.</p>
              </header>

              <div className="stats-row">
                <div className="stat-box">
                  <small>Total Orders</small>
                  <h2>{bookings.length}</h2>
                </div>
                <div className="stat-box">
                  <small>In Progress</small>
                  <h2 className="text-yellow">{bookings.filter(b => b.status === "PENDING").length}</h2>
                </div>
                <div className="stat-box">
                  <small>Completed</small>
                  <h2 className="text-green">{bookings.filter(b => b.status === "ACCEPTED").length}</h2>
                </div>
              </div>

              <div className="booking-section">
                <h3>Recent Bookings</h3>
                <div className="booking-table">
                  {bookings.length > 0 ? bookings.map(b => (
                    <div className="booking-card" key={b.id}>
                      <div className="b-info">
                        <h4>{b.serviceName}</h4>
                        <p>{b.scheduledDate} • {b.location}</p>
                      </div>
                      <div className="b-status">
                        <span className="price">₹{b.price}</span>
                        <span className={`pill ${b.status.toLowerCase()}`}>{b.status}</span>
                      </div>
                    </div>
                  )) : <p className="empty">No bookings yet.</p>}
                </div>
              </div>
            </div>
          )}

          {/* EDIT PROFILE TAB */}
          {activeTab === "profile" && (
            <div className="tab-view fade-in">
              <header className="view-header">
                <h1>Account Settings</h1>
              </header>
              <div className="form-card">
                <div className="field">
                  <label>Full Name</label>
                  <input 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})} 
                  />
                </div>
                <div className="field">
                  <label>Contact Number</label>
                  <input 
                    value={formData.contactno} 
                    onChange={(e) => setFormData({...formData, contactno: e.target.value})} 
                  />
                </div>
                <div className="field">
                  <label>Email (Verified)</label>
                  <input value={user.email} disabled className="locked" />
                </div>
                <button className="submit-btn" onClick={handleSaveProfile}>Update Profile</button>
              </div>
            </div>
          )}

          {/* PASSWORD TAB */}
          {activeTab === "password" && (
            <div className="tab-view fade-in">
              <header className="view-header">
                <h1>Security</h1>
                <p>Update your password to stay protected.</p>
              </header>
              <div className="form-card">
                <div className="field">
                  <label>Current Password</label>
                  <input 
                    type="password" 
                    placeholder="Enter old password"
                    value={passwordData.oldPass}
                    onChange={(e) => setPasswordData({...passwordData, oldPass: e.target.value})} 
                  />
                </div>
                <div className="field">
                  <label>New Password</label>
                  <input 
                    type="password" 
                    placeholder="Enter new password"
                    value={passwordData.newPass}
                    onChange={(e) => setPasswordData({...passwordData, newPass: e.target.value})} 
                  />
                </div>
                <button className="submit-btn security" onClick={handlePasswordUpdate}>Change Password</button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default UserProfile;