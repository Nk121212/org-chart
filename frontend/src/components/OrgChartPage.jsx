import React, { useEffect, useRef, useState } from "react";
import { OrgChart } from "d3-org-chart";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import AdminPanel from "./AdminPanel";

export default function OrgChartPage() {
  const d3Container = useRef(null);
  const [data, setData] = useState([]);

  // Fetch data dari backend
  const fetchEmployees = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/employees");
      const json = await res.json();
      // Filter hanya node valid (punya id)
      const nodes = json.filter(emp => emp.id);
      setData(nodes);
    } catch (err) {
      console.error("API error:", err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Render chart
  useEffect(() => {
    if (!d3Container.current || data.length === 0) return;

    // Pastikan ada tepat 1 root
    const roots = data.filter(emp => !emp.parentId);
    if (roots.length !== 1) return;

    // Bersihkan chart lama
    d3Container.current.innerHTML = "";

    const chart = new OrgChart()
      .container(d3Container.current)
      .data(data)
      .nodeWidth(() => 260)
      .nodeHeight(() => 140)
      .childrenMargin(() => 40)
      .compact(false)
      .nodeContent(d => {
        const color = getDeptColor(d.data.department);
        return `
          <div style="
            padding:10px;
            border-radius:12px;
            background:#fff;
            box-shadow:0 2px 6px rgba(0,0,0,0.15);
            border-top:6px solid ${color};
          ">
            <div style="font-size:16px;font-weight:600;color:#111;margin-bottom:2px">
              ${d.data.name}
            </div>
            <div style="font-size:14px;color:#374151;margin-bottom:2px">
              ${d.data.position}
            </div>
            <div style="font-size:12px;color:#6b7280;margin-bottom:2px">
              ${d.data.department}
            </div>
            <div style="font-size:12px;color:#6b7280">
              ${d.data.email || "-"} | ${d.data.phone || "-"}
            </div>
          </div>
        `;
      })
      .render();
  }, [data]);

  const getDeptColor = dept => {
    switch (dept) {
      case "Technology": return "#3b82f6";
      case "Finance": return "#22c55e";
      case "Human Resources": return "#f97316";
      case "Management": return "#8b5cf6";
      default: return "#6366f1";
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    if (data.length === 0) return alert("No data to export");
    const headers = Object.keys(data[0]).join(",");
    const rows = data.map(row => Object.values(row).join(",")).join("\n");
    const csvContent = [headers, rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "employees.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Export PDF
  const handleExportPDF = async () => {
    if (!d3Container.current) return alert("Chart not ready");
    const canvas = await html2canvas(d3Container.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("orgchart.pdf");
  };

  return (
    <div className="p-4 md:flex gap-6">
      {/* Chart */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-4">Organisasi</h1>
        <div
          ref={d3Container}
          className="w-full h-[600px] md:h-[800px] border border-gray-300 rounded-lg"
        ></div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Export CSV
          </button>
          <button
            onClick={handleExportPDF}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Export PDF
          </button>
        </div>
      </div>

      {/* Admin Panel */}
      <AdminPanel data={data} onAddNodeSuccess={fetchEmployees} />
    </div>
  );
}
