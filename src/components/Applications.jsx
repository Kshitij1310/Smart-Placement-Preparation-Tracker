import { useState } from "react";
import { Trash2, Plus, CheckCircle } from "lucide-react";

export default function Applications({ applications, onAddApplication, onDeleteApplication, onUpdateStatus }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    appliedDate: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleAddApplication = async () => {
    if (!formData.company.trim() || !formData.role.trim()) return;
    setIsLoading(true);
    try {
      await onAddApplication({
        company: formData.company,
        role: formData.role,
        appliedDate: formData.appliedDate || new Date().toLocaleDateString(),
      });
      setFormData({ company: "", role: "", appliedDate: "" });
      setShowForm(false);
    } finally {
      setIsLoading(false);
    }
  };

  const statusColors = {
    Applied: "bg-blue-100 text-blue-700",
    Interview: "bg-purple-100 text-purple-700",
    Selected: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
  };

  const statusFlow = ["Applied", "Interview", "Selected", "Rejected"];
  const statCounts = {
    Applied: applications.filter((a) => a.status === "Applied").length,
    Interview: applications.filter((a) => a.status === "Interview").length,
    Selected: applications.filter((a) => a.status === "Selected").length,
    Rejected: applications.filter((a) => a.status === "Rejected").length,
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">💼 Job & Internship Applications</h2>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {Object.entries(statCounts).map(([status, count]) => (
            <div key={status} className={`p-3 rounded-lg ${statusColors[status]}`}>
              <p className="text-xs opacity-75">{status}</p>
              <p className="text-2xl font-bold">{count}</p>
            </div>
          ))}
        </div>

        {/* Add Application Button */}
        <button
          onClick={() => setShowForm(!showForm)}
          className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition"
        >
          <Plus size={20} />
          Add Application
        </button>

        {/* Add Application Form */}
        {showForm && (
          <div className="mt-4 p-4 border border-green-200 rounded-lg bg-green-50">
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="Company name"
              className="w-full border border-gray-300 rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              placeholder="Job role (e.g., Software Engineer)"
              className="w-full border border-gray-300 rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="date"
              value={formData.appliedDate}
              onChange={(e) => setFormData({ ...formData, appliedDate: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <div className="flex gap-2">
              <button
                onClick={handleAddApplication}
                disabled={isLoading}
                className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-3 py-2 rounded transition"
              >
                {isLoading ? "Adding..." : "Add"}
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-2 rounded transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Applications List */}
      <div className="space-y-3">
        {applications.length === 0 ? (
          <p className="text-gray-500 text-center py-6">No applications yet.</p>
        ) : (
          applications.map((app) => (
            <div key={app._id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800">{app.company}</h3>
                  <p className="text-sm text-gray-600">{app.role}</p>
                  <p className="text-xs text-gray-500 mt-1">Applied: {app.appliedDate || app.createdAt}</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
                  <select
                    value={app.status}
                    onChange={(e) => onUpdateStatus(app._id, e.target.value)}
                    className={`border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${statusColors[app.status]}`}
                  >
                    {statusFlow.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => onDeleteApplication(app._id)}
                    className="text-red-400 hover:text-red-600 transition p-1"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
