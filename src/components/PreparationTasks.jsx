import { useState } from "react";
import { Trash2, Plus, CheckCircle, Circle } from "lucide-react";

export default function PreparationTasks({ tasks, onAddTask, onDeleteTask, onToggleTask, onUpdateTask }) {
  const [newTask, setNewTask] = useState("");
  const [category, setCategory] = useState("DSA");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddTask = async () => {
    if (!newTask.trim()) return;
    setIsLoading(true);
    try {
      await onAddTask({
        text: newTask,
        category,
        status: "Pending",
      });
      setNewTask("");
    } finally {
      setIsLoading(false);
    }
  };

  const categories = ["DSA", "Projects", "Company Research", "Interview Prep", "Other"];
  const statusCounts = {
    Pending: tasks.filter((t) => t.status === "Pending").length,
    Completed: tasks.filter((t) => t.status === "Completed").length,
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">📚 Preparation Tasks</h2>
        
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-gray-600 text-sm">Pending</p>
            <p className="text-2xl font-bold text-blue-600">{statusCounts.Pending}</p>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <p className="text-gray-600 text-sm">Completed</p>
            <p className="text-2xl font-bold text-green-600">{statusCounts.Completed}</p>
          </div>
        </div>

        {/* Add Task Form */}
        <div className="space-y-3">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddTask()}
            placeholder="Enter a preparation task..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex gap-2">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <button
              onClick={handleAddTask}
              disabled={isLoading}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
            >
              <Plus size={20} />
              {isLoading ? "Adding..." : "Add"}
            </button>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-2">
        {tasks.length === 0 ? (
          <p className="text-gray-500 text-center py-6">No tasks yet. Add one to get started!</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task._id}
              className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
            >
              <button
                onClick={() => onToggleTask(task._id)}
                className="mt-1 flex-shrink-0 text-gray-400 hover:text-green-500 transition"
              >
                {task.status === "Completed" ? (
                  <CheckCircle size={24} className="text-green-500" />
                ) : (
                  <Circle size={24} />
                )}
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <p
                    className={`flex-1 ${
                      task.status === "Completed"
                        ? "line-through text-gray-400"
                        : "text-gray-800"
                    }`}
                  >
                    {task.text}
                  </p>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    {task.category}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      task.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {task.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  {new Date(task.createdAt).toLocaleDateString()}
                </p>
              </div>

              <button
                onClick={() => onDeleteTask(task._id)}
                className="text-red-400 hover:text-red-600 transition flex-shrink-0"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
