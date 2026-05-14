import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Side = ({ sidebarOpen }) => {

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className={`sidebar ${sidebarOpen ? "active" : ""}`}>

      <div className="logo">
        <div className="avatar">SS</div>
        <h3>SmartServ</h3>
      </div>

      <ul className="menu">

        <li className={location.pathname === "/dashboard" ? "active" : ""}>
          <Link to="/dashboard">📊 Dashboard</Link>
        </li>

        <li className={location.pathname === "/profile" ? "active" : ""}>
          <Link to="/profile">👤 Profile</Link>
        </li>

        <li className={location.pathname === "/myservices" ? "active" : ""}>
          <Link to="/myservices">🛠 Services</Link>
        </li>
<li className={location.pathname.startsWith("/") ? "active" : ""}>
  <Link to="/">🏠 Home</Link>
</li>

        <li onClick={handleLogout}>
          🚪 Logout
        </li>

      </ul>

    </div>
  );
};

export default Side;