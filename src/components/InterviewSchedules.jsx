import { useState } from "react";
import { Trash2, Plus, AlertCircle, Calendar } from "lucide-react";

export default function InterviewSchedules({ interviews, onAddInterview, onDeleteInterview }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    interviewDate: "",
    interviewTime: "",
    notes: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleAddInterview = async () => {
    if (!formData.company.trim() || !formData.interviewDate) return;
    setIsLoading(true);
    try {
      await onAddInterview({
        company: formData.company,
        role: formData.role || "",
        interviewDate: formData.interviewDate,
        interviewTime: formData.interviewTime || "",
        notes: formData.notes || "",
      });
      setFormData({ company: "", role: "", interviewDate: "", interviewTime: "", notes: "" });
      setShowForm(false);
    } finally {
      setIsLoading(false);
    }
  };

  const getUpcomingInterviews = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return interviews
      .filter((interview) => new Date(interview.interviewDate) >= today)
      .sort((a, b) => new Date(a.interviewDate) - new Date(b.interviewDate));
  };

  const getPastInterviews = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return interviews
      .filter((interview) => new Date(interview.interviewDate) < today)
      .sort((a, b) => new Date(b.interviewDate) - new Date(a.interviewDate));
  };

  const upcomingInterviews = getUpcomingInterviews();
  const pastInterviews = getPastInterviews();

  const isInterviewToday = (date) => {
    const today = new Date();
    const interviewDate = new Date(date);
    return today.toDateString() === interviewDate.toDateString();
  };

  const isInterviewSoon = (date) => {
    const today = new Date();
    const interviewDate = new Date(date);
    const daysUntil = Math.ceil((interviewDate - today) / (1000 * 60 * 60 * 24));
    return daysUntil <= 3 && daysUntil > 0;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">📅 Interview Schedules</h2>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-purple-50 p-3 rounded-lg">
            <p className="text-gray-600 text-sm">Upcoming</p>
            <p className="text-2xl font-bold text-purple-600">{upcomingInterviews.length}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-gray-600 text-sm">Completed</p>
            <p className="text-2xl font-bold text-gray-600">{pastInterviews.length}</p>
          </div>
        </div>

        {/* Add Interview Button */}
        <button
          onClick={() => setShowForm(!showForm)}
          className="w-full bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition"
        >
          <Plus size={20} />
          Schedule Interview
        </button>

        {/* Add Interview Form */}
        {showForm && (
          <div className="mt-4 p-4 border border-purple-200 rounded-lg bg-purple-50">
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="Company name"
              className="w-full border border-gray-300 rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="text"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              placeholder="Role (optional)"
              className="w-full border border-gray-300 rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <div className="grid grid-cols-2 gap-2 mb-2">
              <input
                type="date"
                value={formData.interviewDate}
                onChange={(e) => setFormData({ ...formData, interviewDate: e.target.value })}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="time"
                value={formData.interviewTime}
                onChange={(e) => setFormData({ ...formData, interviewTime: e.target.value })}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Notes (e.g., interview type, meeting link, preparation tips)"
              className="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows="3"
            />
            <div className="flex gap-2">
              <button
                onClick={handleAddInterview}
                disabled={isLoading}
                className="flex-1 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white px-3 py-2 rounded transition"
              >
                {isLoading ? "Scheduling..." : "Schedule"}
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

      {/* Upcoming Interviews */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <Calendar size={20} />
          Upcoming Interviews
        </h3>
        <div className="space-y-3">
          {upcomingInterviews.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No upcoming interviews scheduled.</p>
          ) : (
            upcomingInterviews.map((interview) => (
              <div
                key={interview._id}
                className={`border-l-4 p-4 rounded transition ${
                  isInterviewToday(interview.interviewDate)
                    ? "border-l-red-500 bg-red-50 border border-red-200"
                    : isInterviewSoon(interview.interviewDate)
                    ? "border-l-orange-500 bg-orange-50 border border-orange-200"
                    : "border-l-purple-500 bg-purple-50 border border-purple-200"
                }`}
              >
                <div className="flex justify-between items-start gap-3">
                  <div className="flex-1 min-w-0">
                    {(isInterviewToday(interview.interviewDate) ||
                      isInterviewSoon(interview.interviewDate)) && (
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle
                          size={18}
                          className={
                            isInterviewToday(interview.interviewDate)
                              ? "text-red-500"
                              : "text-orange-500"
                          }
                        />
                        <span
                          className={`text-xs font-semibold ${
                            isInterviewToday(interview.interviewDate)
                              ? "text-red-600"
                              : "text-orange-600"
                          }`}
                        >
                          {isInterviewToday(interview.interviewDate)
                            ? "TODAY"
                            : "UPCOMING SOON"}
                        </span>
                      </div>
                    )}
                    <h4 className="font-semibold text-gray-800">{interview.company}</h4>
                    {interview.role && (
                      <p className="text-sm text-gray-600">{interview.role}</p>
                    )}
                    <div className="text-sm text-gray-700 mt-2">
                      <p>
                        <strong>Date:</strong> {new Date(interview.interviewDate).toLocaleDateString()}
                      </p>
                      {interview.interviewTime && (
                        <p>
                          <strong>Time:</strong> {interview.interviewTime}
                        </p>
                      )}
                    </div>
                    {interview.notes && (
                      <p className="text-sm text-gray-700 mt-2">
                        <strong>Notes:</strong> {interview.notes}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => onDeleteInterview(interview._id)}
                    className="text-red-400 hover:text-red-600 transition flex-shrink-0"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Past Interviews */}
      {pastInterviews.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Past Interviews</h3>
          <div className="space-y-3">
            {pastInterviews.map((interview) => (
              <div
                key={interview._id}
                className="border border-gray-300 p-4 rounded bg-gray-50 opacity-75 hover:opacity-100 transition"
              >
                <div className="flex justify-between items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-700">{interview.company}</h4>
                    {interview.role && (
                      <p className="text-sm text-gray-600">{interview.role}</p>
                    )}
                    <p className="text-sm text-gray-600 mt-1">
                      {new Date(interview.interviewDate).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => onDeleteInterview(interview._id)}
                    className="text-red-400 hover:text-red-600 transition"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
