import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OrgChartPage from "./components/OrgChartPage";
import './index.css'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1 className="text-center mt-10 text-3xl">Welcome to Org Chart App</h1>} />
        <Route path="/chart" element={<OrgChartPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
