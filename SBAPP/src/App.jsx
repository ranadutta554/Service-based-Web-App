import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Dashboard from "./components/dashboard/Dashboard";
import Profile from "./components/dashboard/Profile";
import MyServices from "./components/dashboard/MyService";
import AddService from "./components/dashboard/AddService";

import Carousel from "./components/Carousel";
import PopularServices from "./components/PopularServices";
import SiteMap from "./components/SiteMap";

import ServiceComponent from "./components/ServiceComponent";
import CategoryComponents from "./components/CategoryComponents";

import ServiceDetails from "./components/ServiceDetails";
import BookingPage from "./components/BookingPage";
import UserProfile from "./components/UserProfile";
import MyBookings from "./components/MyBookings";

import Layout from "./components/Layout";
import SignInModal from "./SignInModal"; // ✅ IMPORT MODAL

function App() {

  const [showLogin, setShowLogin] = useState(false);
 const [, setUser] = useState(null);

  // ✅ Listen for login modal trigger
  useEffect(() => {
    const openModal = () => setShowLogin(true);

    window.addEventListener("openLoginModal", openModal);

    return () => {
      window.removeEventListener("openLoginModal", openModal);
    };
  }, []);

  return (
    <>
      {/* ✅ ROUTES */}
      <Routes>

        {/* ================= WITH NAVBAR ================= */}
        <Route element={<Layout setUser={setUser} />}>

          <Route
            path="/"
            element={
              <>
                <Carousel />
                <PopularServices />
                
              </>
            }
          />

          <Route path="/services/:id" element={<ServiceDetails />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/my-bookings" element={<MyBookings />} />

        </Route>

        {/* ================= WITHOUT NAVBAR ================= */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/myservices" element={<MyServices />} />
        <Route path="/addservice" element={<AddService />} />
        <Route path="/categories" element={<CategoryComponents />} />
        <Route path="/services" element={<ServiceComponent />} />
        <Route path="/booking/:id" element={<BookingPage />} />

      </Routes>

      {/* ✅ GLOBAL LOGIN MODAL */}
      {showLogin && (
        <SignInModal
          closeModal={() => setShowLogin(false)}
          setUser={setUser}
        />
      )}
    </>
  );
}

export default App;