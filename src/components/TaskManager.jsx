import { useState, useEffect } from "react";

export default function TaskManager() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() =>
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!task) return;
    setTasks([...tasks, { text: task, done: false }]);
    setTask("");
  };

  const toggleTask = (i) => {
    const updated = [...tasks];
    updated[i].done = !updated[i].done;
    setTasks(updated);
  };

  const deleteTask = (i) => {
    setTasks(tasks.filter((_, index) => index !== i));
  };

  return (
    <div className="max-w-md mx-auto bg-white p-4 rounded shadow">
      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter preparation task"
        className="border p-2 w-full mb-2"
      />
      <button
        onClick={addTask}
        className="bg-blue-500 text-white px-4 py-2 w-full rounded"
      >
        Add Task
      </button>

      <ul className="mt-4">
        {tasks.map((t, i) => (
          <li
            key={i}
            className="flex justify-between items-center border-b py-2"
          >
            <span
              onClick={() => toggleTask(i)}
              className={t.done ? "line-through text-gray-500" : ""}
            >
              {t.text}
            </span>
            <button
              onClick={() => deleteTask(i)}
              className="text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}