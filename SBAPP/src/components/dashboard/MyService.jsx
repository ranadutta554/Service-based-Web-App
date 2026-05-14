import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Side from "./Side";
import Nav from "./Nav";
import "./MyService.css";

const MyServices = () => {

  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [editService, setEditService] = useState(null);

  // ✅ FIX: stable user (no infinite loop)
  const user = useMemo(() => {
    return JSON.parse(localStorage.getItem("user") || "null");
  }, []);

  // ✅ FETCH SERVICES (RUN ONLY ONCE)
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);

        if (!user?.email) return;

        const res = await axios.get(
          `http://localhost:8086/myservice/provider/${user.email}`
        );

        setServices(res.data || []);

      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []); // ✅ no infinite loop

  // ✅ DELETE SERVICE (FIXED)
  const deleteService = async (id) => {
    if (!window.confirm(`🗑️ Delete service ID: ${id}?`)) return;

    try {
      await axios.delete(`http://localhost:8086/myservice/delete/${id}`);

      // ✅ remove using PRIMARY KEY
      setServices(prev => prev.filter(s => s.id !== id));

      alert("Deleted successfully ✅");

    } catch (err) {
      console.error("Delete error:", err.response || err);
      alert("Delete failed ❌");
    }
  };

  // ✅ UPDATE SERVICE
  const updateService = async () => {
    try {
      await axios.put(
        `http://localhost:8086/myservice/update/${editService.id}`,
        editService
      );

      // update UI instantly
      setServices(prev =>
        prev.map(s => (s.id === editService.id ? editService : s))
      );

      setEditService(null);

      alert("Updated successfully ✅");

    } catch (err) {
      console.error(err);
      alert("Update failed ❌");
    }
  };

  // ✅ SEARCH FILTER
  const filteredServices = useMemo(() => {
    return services.filter((s) =>
      (s.serviceName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.serviceType || "").toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [services, searchTerm]);

  // ✅ NAVIGATION
  const openAddServicePage = () => {
    window.location.href = "/addservice";
  };

  return (
    <div className="dashboard full-width-view">
      <Side />

      <div className="main-section">
        <Nav />

        <div className="body-content">

          {/* HEADER */}
          <div className="service-header-3d">
            <div className="header-left">
              <h2>My Services <span>({services.length})</span></h2>
              <p>Manage your services</p>
            </div>

            <div className="header-actions">
              <input
                type="text"
                placeholder="Search..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <button className="add-btn-3d" onClick={openAddServicePage}>
                + Add Service
              </button>
            </div>
          </div>

          {/* TABLE */}
          <div className="table-container-3d">
            <table className="service-table-modern">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Location</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7">Loading...</td>
                  </tr>
                ) : filteredServices.length > 0 ? (
                  filteredServices.map((s) => (
                    <tr key={s.id}>

                      <td>
                        <img
                          src={`http://localhost:8086/images/${s.imagePath}`}
                          width="80"
                          alt=""
                        />
                      </td>

                      <td>{s.serviceName}</td>
                      <td>{s.serviceType}</td>
                      <td>{s.location}</td>
                      <td>₹{s.charge}</td>
                      <td>{s.status}</td>

                      <td>
                        {/* EDIT */}
                        <button
                          className="edit-btn-3d"
                          onClick={() => setEditService(s)}
                        >
                          ✏️
                        </button>

                        {/* DELETE */}
                        <button
                          className="delete-btn-3d"
                          onClick={() => deleteService(s.id)}
                        >
                          🗑️
                        </button>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">No services found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* EDIT MODAL */}
          {editService && (
            <div className="edit-modal">
              <div className="edit-box">
                <h3>Edit Service</h3>

                <input
                  value={editService.serviceName}
                  onChange={(e) =>
                    setEditService({
                      ...editService,
                      serviceName: e.target.value
                    })
                  }
                />

                <input
                  value={editService.location}
                  onChange={(e) =>
                    setEditService({
                      ...editService,
                      location: e.target.value
                    })
                  }
                />

                <input
                  type="number"
                  value={editService.charge}
                  onChange={(e) =>
                    setEditService({
                      ...editService,
                      charge: e.target.value
                    })
                  }
                />

                <div style={{ marginTop: "10px" }}>
                  <button onClick={updateService}>Update</button>
                  <button onClick={() => setEditService(null)}>Cancel</button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default MyServices;