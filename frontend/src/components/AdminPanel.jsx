import React, { useState } from "react";

export default function AdminPanel({ data, onAddNodeSuccess }) {
  const [form, setForm] = useState({
    parentId: "",
    name: "",
    position: "",
    department: "",
    email: "",
    phone: "",
  });

  const handleChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleAddNode = async () => {
    if (!form.name || !form.position) return alert("Isi name & position!");
    try {
      const res = await fetch("http://localhost:5000/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Gagal menambah node");

      const saved = await res.json();

      // Pastikan hanya node valid
      if (!saved.id) return;

      // Callback ke OrgChartPage untuk refresh chart
      onAddNodeSuccess(saved);

      // Reset form
      setForm({ parentId: "", name: "", position: "", department: "", email: "", phone: "" });
    } catch (err) {
      console.error(err);
      alert("Gagal menambah node");
    }
  };

  return (
    <div className="w-full md:w-96 p-4 border border-gray-200 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Admin Panel</h2>
      {["name","position","department","email","phone"].map(key => (
        <label key={key} className="block mb-2">
          {key.charAt(0).toUpperCase()+key.slice(1)}
          <input
            type="text"
            name={key}
            value={form[key]}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
          />
        </label>
      ))}

      {/* Parent dropdown */}
      <label className="block mb-2">
        Parent
        <select
          name="parentId"
          value={form.parentId}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
        >
          <option value="">-- Root (no parent) --</option>
          {data.map(emp => (
            <option key={emp.id} value={emp.id}>
              {emp.name} ({emp.position})
            </option>
          ))}
        </select>
      </label>

      <button
        onClick={handleAddNode}
        className="mt-2 w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Add Node
      </button>
    </div>
  );
}
