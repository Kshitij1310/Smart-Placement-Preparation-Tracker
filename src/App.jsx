import { useState, useEffect } from "react";
import PreparationTasks from "./components/PreparationTasks";
import Applications from "./components/Applications";
import InterviewSchedules from "./components/InterviewSchedules";
import { Menu, X } from "lucide-react";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [applications, setApplications] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [activeTab, setActiveTab] = useState("tasks");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  /* =========================
     LOAD DATA FROM LOCALSTORAGE
     ========================= */
  useEffect(() => {
    const t = JSON.parse(localStorage.getItem("tasks")) || [];
    const a = JSON.parse(localStorage.getItem("applications")) || [];
    const i = JSON.parse(localStorage.getItem("interviews")) || [];

    setTasks(t);
    setApplications(a);
    setInterviews(i);
  }, []);

  /* =========================
     TASK HANDLERS
     ========================= */
  const addTask = async (task) => {
    const newTask = {
      ...task,
      _id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    const updated = [...tasks, newTask];
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
  };

  const deleteTask = async (id) => {
    const updated = tasks.filter((t) => t._id !== id);
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
  };

  const toggleTask = async (id) => {
    const updated = tasks.map((t) =>
      t._id === id
        ? { ...t, status: t.status === "Completed" ? "Pending" : "Completed" }
        : t
    );
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
  };

  const updateTask = async (id, updatedTask) => {
    const updated = tasks.map((t) =>
      t._id === id ? { ...t, ...updatedTask } : t
    );
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
  };

  /* =========================
     APPLICATION HANDLERS
     ========================= */
  const addApplication = async (app) => {
    const newApp = {
      ...app,
      _id: Date.now().toString(),
      status: "Applied",
      createdAt: new Date().toISOString(),
    };
    const updated = [...applications, newApp];
    setApplications(updated);
    localStorage.setItem("applications", JSON.stringify(updated));
  };

  const deleteApplication = async (id) => {
    const updated = applications.filter((a) => a._id !== id);
    setApplications(updated);
    localStorage.setItem("applications", JSON.stringify(updated));
  };

  const updateApplicationStatus = async (id, status) => {
    const updated = applications.map((a) =>
      a._id === id ? { ...a, status } : a
    );
    setApplications(updated);
    localStorage.setItem("applications", JSON.stringify(updated));
  };

  /* =========================
     INTERVIEW HANDLERS
     ========================= */
  const addInterview = async (interview) => {
    const newInterview = {
      ...interview,
      _id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    const updated = [...interviews, newInterview];
    setInterviews(updated);
    localStorage.setItem("interviews", JSON.stringify(updated));
  };

  const deleteInterview = async (id) => {
    const updated = interviews.filter((i) => i._id !== id);
    setInterviews(updated);
    localStorage.setItem("interviews", JSON.stringify(updated));
  };

  const tabs = [
    { id: "tasks", label: "📚 Tasks" },
    { id: "applications", label: "💼 Applications" },
    { id: "interviews", label: "📅 Interviews" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* HEADER */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Placement Tracker
            </h1>
            <p className="text-sm text-gray-600">
              Your journey to success starts here
            </p>
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-50 border-t">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 ${
                  activeTab === tab.id
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* MAIN */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="hidden md:flex gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-semibold ${
                activeTab === tab.id
                  ? "bg-blue-500 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "tasks" && (
          <PreparationTasks
            tasks={tasks}
            onAddTask={addTask}
            onDeleteTask={deleteTask}
            onToggleTask={toggleTask}
            onUpdateTask={updateTask}
          />
        )}

        {activeTab === "applications" && (
          <Applications
            applications={applications}
            onAddApplication={addApplication}
            onDeleteApplication={deleteApplication}
            onUpdateStatus={updateApplicationStatus}
          />
        )}

        {activeTab === "interviews" && (
          <InterviewSchedules
            interviews={interviews}
            onAddInterview={addInterview}
            onDeleteInterview={deleteInterview}
          />
        )}
      </main>
    </div>
  );
}
