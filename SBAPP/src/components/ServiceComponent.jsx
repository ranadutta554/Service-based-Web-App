import React, { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import axios from "axios";

const SERVICE_API = "http://localhost:8086/service";
const CATEGORY_API = "http://localhost:8086/api";

const ServiceComponent = () => {

  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    serviceId: "",
    serviceName: "",
    serviceType: "",
    
    cid: ""
  });

  // ================= FETCH SERVICES =================
  const fetchServices = async () => {
    try {
      const res = await axios.get(`${SERVICE_API}/fetchs`);
      setServices(res.data);
    } catch (err) {
      console.error("Service fetch error", err);
    }
  };

  // ================= FETCH CATEGORIES =================
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${CATEGORY_API}/fetch`);
      setCategories(res.data);
    } catch (err) {
      console.error("Category fetch error", err);
    }
  };

  useEffect(() => {
    fetchServices();
    fetchCategories();
  }, []);

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {

    let value = e.target.value;

    if (e.target.name === "cid") {
      value = Number(value);
    }

    setForm({
      ...form,
      [e.target.name]: value
    });
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const payload = {
        serviceName: form.serviceName,
        serviceType: form.serviceType,
       
        cid: Number(form.cid)
      };

      if (form.serviceId) {
        payload.serviceId = form.serviceId;
        await axios.put(`${SERVICE_API}/updates`, payload);
      } else {
        await axios.post(`${SERVICE_API}/addS`, payload);
      }

      alert("Saved Successfully ✅");

      setForm({
        serviceId: "",
        serviceName: "",
        serviceType: "",
       
        cid: ""
      });

      fetchServices();

    } catch (err) {
      console.error(err);
      alert("Error Saving Data ❌");
    }
  };

  // ================= EDIT =================
  const handleEdit = (s) => {
    setForm(s);
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    await axios.delete(`${SERVICE_API}/deletes/${id}`);
    fetchServices();
  };

  return (
    <div style={{ padding: "20px" }}>

      <h2>Service Management</h2>

      <form onSubmit={handleSubmit}>

        {/* Category Dropdown */}
        <select
          name="cid"
          value={form.cid}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>

          {categories.map((c) => (
            <option key={c.cid} value={c.cid}>
              {c.cname}
            </option>
          ))}

        </select>

        <br />

        <input
          type="text"
          name="serviceName"
          placeholder="Service Name"
          value={form.serviceName}
          onChange={handleChange}
          required
        />

        <br />

        <input
          type="text"
          name="serviceType"
          placeholder="Service Type"
          value={form.serviceType}
          onChange={handleChange}
          required
        />

        <br />

        

        <br />

        <button type="submit">
          {form.serviceId ? "Update" : "Add"}
        </button>

      </form>

      <hr />

      <table border="1" cellPadding="10">

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            
            <th>Category ID</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {services.map((s) => (
            <tr key={s.serviceId}>
              <td>{s.serviceId}</td>
              <td>{s.serviceName}</td>
              <td>{s.serviceType}</td>
              <td>{s.description}</td>
              <td>{s.cid}</td>

              <td>
                <button onClick={() => handleEdit(s)}><CiEdit /></button>
              
                <button onClick={() => handleDelete(s.serviceId)}>
                  <MdDeleteOutline />
                </button>
              </td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
};

export default ServiceComponent;