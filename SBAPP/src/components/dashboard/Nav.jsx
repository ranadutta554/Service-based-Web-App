import React from "react";

const Nav = ({ notificationCount, onBellClick, toggleSidebar }) => {

  return (
    <div className="topbar">

      {/* ☰ MENU BUTTON */}
      <button className="menu-btn" onClick={toggleSidebar}>
        ☰
      </button>

      <h2>Provider Dashboard</h2>

      <div className="topbar-right">

        <div className="bell" onClick={onBellClick}>
          🔔
          {notificationCount > 0 && (
            <span className="badge">{notificationCount}</span>
          )}
        </div>

        <span>👤 My Account</span>

      </div>

    </div>
  );
};

export default Nav;