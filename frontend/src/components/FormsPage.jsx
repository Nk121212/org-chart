import React, { useState } from "react";
import {
  User,
  Briefcase,
  Building2,
  Mail,
  Phone,
  IdCard,
  Star,
  MessageSquare,
  Calendar,
  FileText,
} from "lucide-react";

export default function FormsPage() {
  const [active, setActive] = useState("employee");

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    let url = "";
    if (type === "employee") url = "http://localhost:5000/api/employees";
    if (type === "evaluation") url = "http://localhost:5000/api/evaluations";
    if (type === "leave") url = "http://localhost:5000/api/leaves";

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      alert("✅ Data submitted successfully!");
      e.target.reset();
    } else {
      alert("❌ Error submitting data");
    }
  };

  const tabs = [
    { key: "employee", label: "Employee Info" },
    { key: "evaluation", label: "Performance Evaluation" },
    { key: "leave", label: "Leave Request" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          HR Forms
        </h1>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={`px-6 py-2 rounded-full font-medium transition shadow-sm ${
                active === tab.key
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-gray-100 border"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Card Form */}
        <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
          {/* Employee Form */}
          {active === "employee" && (
            <form
              onSubmit={(e) => handleSubmit(e, "employee")}
              className="space-y-6"
            >
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Employee Information
              </h2>

              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  name="name"
                  placeholder="Full Name"
                  required
                  className="w-full pl-10 pr-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

              <div className="relative">
                <Briefcase
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <input
                  name="position"
                  placeholder="Position"
                  required
                  className="w-full pl-10 pr-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

              <div className="relative">
                <Building2
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <input
                  name="department"
                  placeholder="Department"
                  required
                  className="w-full pl-10 pr-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

              <div className="relative">
                <Mail
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  required
                  className="w-full pl-10 pr-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

              <div className="relative">
                <Phone
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <input
                  name="phone"
                  placeholder="Phone"
                  className="w-full pl-10 pr-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.01] transition font-semibold"
              >
                Save Employee
              </button>
            </form>
          )}

          {/* Evaluation Form */}
          {active === "evaluation" && (
            <form
              onSubmit={(e) => handleSubmit(e, "evaluation")}
              className="space-y-6"
            >
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Performance Evaluation
              </h2>

              <div className="relative">
                <IdCard
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <input
                  name="employeeId"
                  placeholder="Employee ID"
                  required
                  className="w-full pl-10 pr-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                />
              </div>

              <div className="relative">
                <User
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <input
                  name="evaluator"
                  placeholder="Evaluator Name"
                  required
                  className="w-full pl-10 pr-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                />
              </div>

              <div className="relative">
                <Star
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <input
                  name="score"
                  type="number"
                  placeholder="Score (1-10)"
                  required
                  className="w-full pl-10 pr-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                />
              </div>

              <div className="relative">
                <MessageSquare
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <textarea
                  name="comments"
                  placeholder="Comments"
                  className="w-full pl-10 pr-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition min-h-[100px]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.01] transition font-semibold"
              >
                Save Evaluation
              </button>
            </form>
          )}

          {/* Leave Form */}
          {active === "leave" && (
            <form
              onSubmit={(e) => handleSubmit(e, "leave")}
              className="space-y-6"
            >
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Leave Request
              </h2>

              <div className="relative">
                <IdCard
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <input
                  name="employeeId"
                  placeholder="Employee ID"
                  required
                  className="w-full pl-10 pr-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                />
              </div>

              <div className="relative">
                <Calendar
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <input
                  name="start_date"
                  type="date"
                  required
                  className="w-full pl-10 pr-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                />
              </div>

              <div className="relative">
                <Calendar
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <input
                  name="end_date"
                  type="date"
                  required
                  className="w-full pl-10 pr-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                />
              </div>

              <div className="relative">
                <FileText
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <textarea
                  name="reason"
                  placeholder="Reason for leave"
                  className="w-full pl-10 pr-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition min-h-[100px]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.01] transition font-semibold"
              >
                Submit Leave
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
