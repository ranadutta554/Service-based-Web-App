import React, { useEffect, useState } from "react";
import axios from "axios";
import Side from "./Side";
import Nav from "./Nav";
import Footer from "./Footer";
import "./Profile.css";

const Profile = () => {

const [profile, setProfile] = useState({
name: "",
email: "",
pass: "",
contactno: ""
});
const [showOldPass, setShowOldPass] = useState(false);
const [showNewPass, setShowNewPass] = useState(false);
const [oldPass, setOldPass] = useState("");
const [newPass, setNewPass] = useState("");

const user = JSON.parse(localStorage.getItem("user"));

useEffect(() => {
if (user && user.email) {
axios.get(`http://localhost:8086/fetchr/${user.email}`)
.then((res) => {
setProfile(res.data);
})
.catch((err) => {
console.log(err);
});
}
},[]);

const handleChange = (e) => {
const { name, value } = e.target;


setProfile({
  ...profile,
  [name]: value
});


};

const updateProfile = () => {


if (oldPass !== profile.pass) {
  alert("Old password is incorrect");
  return;
}

const updatedProfile = {
  ...profile,
  pass: newPass === "" ? profile.pass : newPass
};

axios.put("http://localhost:8086/updater", updatedProfile)
  .then(() => {
    alert("Profile Updated Successfully");
    setProfile(updatedProfile);
    setOldPass("");
    setNewPass("");
  })
  .catch((err) => {
    console.log(err);
    alert("Update failed");
  });


};

return ( <div className="dashboard">


  <Side />

  <div className="main-section">

    <Nav />

    <div className="body">

      <div className="profile-box">

        <h2>Update Profile</h2>

        <label>Email</label>
        <input
          type="email"
          value={profile.email || ""}
          disabled
        />

        <label>Name</label>
        <input
          type="text"
          name="name"
          value={profile.name || ""}
          onChange={handleChange}
        />

        <label>Contact</label>
        <input
          type="text"
          name="contactno"
          value={profile.contactno || ""}
          onChange={handleChange}
        />

        <label>Old Password</label>
<div className="pass-box">
  <input
    type={showOldPass ? "text" : "password"}
    value={oldPass}
    onChange={(e) => setOldPass(e.target.value)}
  />
  <button
    type="button"
    onClick={() => setShowOldPass(!showOldPass)}
  >
    {showOldPass ? "Hide" : "Show"}
  </button>
</div>

<label>New Password</label>
<div className="pass-box">
  <input
    type={showNewPass ? "text" : "password"}
    value={newPass}
    onChange={(e) => setNewPass(e.target.value)}
  />
  <button
    type="button"
    onClick={() => setShowNewPass(!showNewPass)}
  >
    {showNewPass ? "Hide" : "Show"}
  </button>
</div>

        <button className="update-btn" onClick={updateProfile}>
          Update Profile
        </button>

      </div>

    </div>

    <Footer />

  </div>

</div>


);
};

export default Profile;
