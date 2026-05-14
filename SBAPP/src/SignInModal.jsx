import React, { useState } from "react";
import axios from "axios";
import "./SignInModal.css";
import { useNavigate } from "react-router-dom";

const SignInModal = ({ closeModal, setUser }) => {

  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    pass: "",
    contactno: "",
    role: "USER"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {

      // ✅ SIGN UP
      if (isSignUp) {
        if (formData.role === "USER") {
          await axios.post("http://localhost:8086/user/register", formData);
        } else {
          await axios.post("http://localhost:8086/addr", formData);
        }

        alert("Registration Successful ✅");
        return;
      }

      // ✅ LOGIN
      let response;

      if (formData.role === "USER") {
        response = await axios.post(
          "http://localhost:8086/user/login",
          {
            email: formData.email,
            pass: formData.pass
          }
        );
      } else {
        response = await axios.post(
          "http://localhost:8086/login",
          {
            email: formData.email,
            pass: formData.pass
          }
        );
      }

      const user = response.data;

      alert("Login Successful ✅");

      // ✅ Save user
      localStorage.setItem("user", JSON.stringify({
        name: user.name,
        email: user.email,
        role: formData.role
      }));

      closeModal();

      // ✅ REDIRECT BACK (IMPORTANT)
     // ✅ REDIRECT AFTER LOGIN
const redirectPath = localStorage.getItem("redirectAfterLogin");

if (redirectPath) {
  localStorage.removeItem("redirectAfterLogin");
  navigate(redirectPath);
  return;
}

      // ✅ DEFAULT NAVIGATION
      if (formData.role === "PROVIDER") {
        navigate("/dashboard");
      } else {
        setUser({
          name: user.name,
          email: user.email,
          role: "USER"
        });
      }

    } catch (error) {
      alert(error.response?.data || "Error ❌");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">

        <button className="close-btn" onClick={closeModal}>×</button>

        <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>

        {isSignUp && (
          <>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
            />

            <input
              type="number"
              name="contactno"
              placeholder="Contact Number"
              onChange={handleChange}
            />
          </>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="pass"
          placeholder="Password"
          onChange={handleChange}
        />

        <select name="role" onChange={handleChange} value={formData.role}>
          <option value="USER">User</option>
          <option value="PROVIDER">Service Provider</option>
        </select>

        <button className="signin-btn" onClick={handleSubmit}>
          {isSignUp ? "Create Account" : "Sign In"}
        </button>

        <p className="signup-text">
          {isSignUp ? "Already have an account?" : "New user?"}{" "}
          <span onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? "Sign In" : "Create New Account"}
          </span>
        </p>

      </div>
    </div>
  );
};

export default SignInModal;