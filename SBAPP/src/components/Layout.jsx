import React from "react";
import { Outlet } from "react-router-dom";
import LandingNav from "./LandingNav";
import SiteMap from "./SiteMap";

const Layout = () => {
  return (
    <div className="app-layout">
      <LandingNav />

      <main className="main-content">
        <Outlet />
      </main>

      <SiteMap /> {/* ✅ Footer always visible */}
    </div>
  );
};

export default Layout;