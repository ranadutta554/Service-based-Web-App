import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

const API = "http://localhost:8086/api";

const CategoryComponents = () => {
  const [categories, setCategories] = useState([]);
  const [cateName,setCateName]=useState({
    cname:""
  });
  const [form, setForm] = useState({
    cid: "",
    cname: ""
  });

  // Fetch all categories
  const fetchCategories = async () => {
    const res = await axios.get(`${API}/fetch`);
    setCategories(res.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
    setCateName({
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.cid) {
      await axios.put(`${API}/update`, form);
    } else {

      await axios.post(`${API}/add`, cateName);
    }

    setForm({ cid: "", cname: "" });
    fetchCategories();
  };

  const handleEdit = (cat) => {
    setForm(cat);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/delete/${id}`);
    fetchCategories();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Category Management</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="cname"
          placeholder="Category Name"
          value={form.cname}
          onChange={handleChange}
          required
          style={{ marginRight: "10px", padding: "5px" }}
        />

        <button type="submit">
          {form.cid ? "Update" : "Add"}
        </button>
      </form>

      {/* Table */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
          textAlign: "center"
        }}
        border="1"
      >
        <thead style={{ backgroundColor: "#f2f2f2" }}>
          <tr>
            <th>ID</th>
            <th>Category Name</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.length > 0 ? (
            categories.map((cat) => (
              <tr key={cat.cid}>
                <td>{cat.cid}</td>
                <td>{cat.cname}</td>
                
                <td>
                  <button
                    onClick={() => handleEdit(cat)}
                    style={{ marginRight: "10px" }}
                  >
                    <CiEdit />
                  </button>

                  <button onClick={() => handleDelete(cat.cid)}>
                    <MdDeleteOutline />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No Data Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryComponents;
