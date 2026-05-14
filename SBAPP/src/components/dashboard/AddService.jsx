
import React, { useEffect, useState } from "react";
import axios from "axios";
import Side from "./Side";
import Nav from "./Nav";
import MapPopup from "./MapPopup";
import "./AddService.css";

import toast from "react-hot-toast";
//import { motion } from "framer-motion";
import { motion as Motion } from "framer-motion";
const AddService = () => {

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [categories, setCategories] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [services, setServices] = useState([]);

  const [showMap, setShowMap] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [serviceData, setServiceData] = useState({
    serviceId: "",
    serviceName: "",
    description: "",
    location: "",
    charge: "",
    status: "ACTIVE",
    serviceType: "",
    meetingLink: ""
  });

  const [days, setDays] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // ✅ FETCH CATEGORY
  useEffect(() => {
    axios.get("http://localhost:8086/api/fetch")
      .then(res => setCategories(res.data))
      .catch(() => toast.error("Failed to load categories"));
  }, []);

  // ✅ FETCH SERVICES
  useEffect(() => {
    axios.get("http://localhost:8086/service/fetchs")
      .then(res => setAllServices(res.data))
      .catch(() => toast.error("Failed to load services"));
  }, []);

  // ✅ IMAGE PREVIEW (CLEAN MEMORY)
  useEffect(() => {
    if (!image) return;

    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  // ✅ CATEGORY CHANGE
  const handleCategoryChange = (e) => {
    const cid = e.target.value;
    const filtered = allServices.filter(s => s.cid === Number(cid));
    setServices(filtered);
  };

  // ✅ INPUT CHANGE
  const handleChange = (e) => {
    setServiceData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // ✅ IMAGE
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  // ✅ DAYS
  const toggleDay = (day) => {
    setDays(prev =>
      prev.includes(day)
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  // ✅ SUBMIT
  const submitService = async (e) => {
    e.preventDefault();

    if (!user) return toast.error("Login required");
    if (!image) return toast.error("Select image");
    if (!serviceData.serviceId) return toast.error("Select service");
    if (!serviceData.serviceType) return toast.error("Select service type");
    if (!serviceData.charge) return toast.error("Enter charge");
    if (!startTime || !endTime) return toast.error("Select working time");

    const formData = new FormData();

    formData.append("image", image);
    formData.append("serviceId", serviceData.serviceId);
    formData.append("serviceName", serviceData.serviceName);
    formData.append("description", serviceData.description || "NA");
    formData.append("location", serviceData.location || "NA");
    formData.append("workingTime", `${startTime}-${endTime}`);
    formData.append("workingDays", days.length ? days.join(",") : "NA");
    formData.append("charge", serviceData.charge);
    formData.append("status", serviceData.status);
    formData.append("serviceType", serviceData.serviceType);
    formData.append("meetingLink", serviceData.meetingLink || "");

    try {
      setSubmitting(true);

      await axios.post("http://localhost:8086/myservice/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-User-Email": user.email,
          "X-User-Name": user.name
        }
      });

      toast.success("Service Added Successfully ✅");

      // RESET
      setServiceData({
        serviceId: "",
        serviceName: "",
        description: "",
        location: "",
        charge: "",
        status: "ACTIVE",
        serviceType: "",
        meetingLink: ""
      });

      setImage(null);
      setPreview(null);
      setDays([]);
      setStartTime("");
      setEndTime("");

    } catch (err) {
      console.error(err);
      toast.error("Error adding service ❌");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="dashboard">
      <Side />

      <div className="main-section">
        <Nav />

        <div className="body">
          <h2>Add Service</h2>

          {/* <motion.form
  className="add-service-form"
  onSubmit={submitService}
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
> */}
<Motion.form
className="add-service-form"
  onSubmit={submitService}
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
>


            {/* CATEGORY */}
            <div className="row">
              <select onChange={handleCategoryChange}>
                <option value="">Select Category</option>
                {categories.map(c => (
                  <option key={c.cid} value={c.cid}>{c.cname}</option>
                ))}
              </select>

              <select onChange={(e) => {
                const selected = services.find(
                  s => s.serviceId === Number(e.target.value)
                );
                if (!selected) return;

                setServiceData(prev => ({
                  ...prev,
                  serviceId: selected.serviceId,
                  serviceName: selected.serviceName
                }));
              }}>
                <option value="">Select Service</option>
                {services.map(s => (
                  <option key={s.serviceId} value={s.serviceId}>
                    {s.serviceName}
                  </option>
                ))}
              </select>

              <select name="serviceType" onChange={handleChange}>
                <option value="">Select Type</option>
                <option value="OFFLINE">Offline</option>
                <option value="ONLINE">Online</option>
              </select>
            </div>

            {/* PROVIDER */}
            <input value={user?.name || ""} readOnly />

            {/* DESCRIPTION */}
            <textarea
              name="description"
              placeholder="Description"
              value={serviceData.description}
              onChange={handleChange}
            />

            {/* IMAGE */}
            <div className="image-upload-box">
              <input type="file" onChange={handleImageChange} />
              {preview && (
                <div className="image-preview">
                  <img src={preview} alt="preview" />
                </div>
              )}
            </div>

            {/* LOCATION */}
            {serviceData.serviceType === "OFFLINE" && (
              <MapPopup
  setLocation={(loc) =>
    setServiceData(prev => ({ ...prev, location: loc }))
  }
  closeMap={() => setShowMap(false)}
/>
            )}

            {/* ONLINE */}
            {serviceData.serviceType === "ONLINE" && (
              <input
                name="meetingLink"
                placeholder="Meeting Link"
                value={serviceData.meetingLink}
                onChange={handleChange}
              />
            )}

            {/* CHARGE */}
            <input
              type="number"
              name="charge"
              placeholder="Charge"
              value={serviceData.charge}
              onChange={handleChange}
            />

            {/* TIME */}
            <div className="row">
              <input type="time" onChange={(e) => setStartTime(e.target.value)} />
              <input type="time" onChange={(e) => setEndTime(e.target.value)} />
            </div>

            {/* DAYS */}
            <div className="days">
              {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(day => (
                <label key={day}>
                  <input
                    type="checkbox"
                    checked={days.includes(day)}
                    onChange={() => toggleDay(day)}
                  />
                  {day}
                </label>
              ))}
            </div>

            {/* SUBMIT */}
            <button type="submit" disabled={submitting}>
              {submitting ? "Adding..." : "Add Service"}
            </button>

          </Motion.form>

          {/* MAP */}
          {showMap && (
            <MapPopup
              setLocation={(loc) =>
                setServiceData(prev => ({ ...prev, location: loc }))
              }
              closeMap={() => setShowMap(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AddService;