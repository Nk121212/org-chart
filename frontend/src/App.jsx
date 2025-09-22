import React, { useEffect, useRef, useState } from "react";
import { OrgChart } from "d3-org-chart";
// import OrgChartPage from "./components/OrgChart";

export default function App() {
  const d3Container = useRef(null);
  const [data, setData] = useState([]);

  // Ambil data dari backend dengan fetch
  useEffect(() => {
    fetch("http://localhost:5000/api/org")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("API error:", err));
  }, []);

  useEffect(() => {
    if (data.length > 0 && d3Container.current) {
      new OrgChart()
        .container(d3Container.current)
        .data(data)
        .nodeWidth(() => 260)
        .nodeHeight(() => 120)
        .childrenMargin(() => 40)
        .compact(false)
        .nodeContent((d) => {
          return `
            <div style="padding:10px;border-radius:12px;background:#fff;
              box-shadow:0 2px 6px rgba(0,0,0,0.15);
              border-top:6px solid ${
                d.data.department === "Technology"
                  ? "#3b82f6"
                  : d.data.department === "Finance"
                  ? "#22c55e"
                  : d.data.department === "Human Resources"
                  ? "#f97316"
                  : "#6366f1"
              }">
              <div style="font-size:16px;font-weight:600;color:#111;margin-bottom:4px">
                ${d.data.name}
              </div>
              <div style="font-size:14px;color:#374151;margin-bottom:6px">
                ${d.data.position}
              </div>
              <div style="font-size:12px;color:#6b7280">
                ${d.data.department}
              </div>
            </div>
          `;
        })
        .render();
    }
  }, [data]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Organisasi Demo</h1>
      <div
        ref={d3Container}
        style={{ width: "100%", height: "600px", border: "1px solid #ddd" }}
      ></div>
    </div>
  );
}
