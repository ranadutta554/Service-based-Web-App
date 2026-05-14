import React, { useState } from "react";
import Nav from "./Nav";
import Body from "./Body";
import Side from "./Side";
import Footer from "./Footer";
import "./Dashboard.css";

const Dashboard = () => {

  const [notificationCount, setNotificationCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // ✅ NEW

  return (
    <div className="dashboard">

      <Side sidebarOpen={sidebarOpen} />

      <div className="main-section">

        <Nav 
          notificationCount={notificationCount}
          onBellClick={() => {
            setShowNotifications(prev => !prev);
            setNotificationCount(0);
          }}
          toggleSidebar={() => setSidebarOpen(prev => !prev)} // ✅ NEW
        />

        <Body 
          setNotificationCount={setNotificationCount}
          showNotifications={showNotifications}
        />

        <Footer />

      </div>

    </div>
  );
};

export default Dashboard;