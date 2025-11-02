import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import * as taskApi from "./api/taskApi";
import { styles } from "./styles/commonStyles";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    priority: "MEDIUM",
    isCompleted: false,
  });

  const priorityMap = {
    HIGH: 0,
    MEDIUM: 1,
    LOW: 2
  };

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    setLoading(true);
    try {
      const allTasks = await taskApi.fetchTasks();
      setTasks(allTasks);
    } catch (err) {
      console.error(err);
      alert("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }

  // const sortedTasks = [...tasks].sort((a, b) => {
  //   if (a.isCompleted !== b.isCompleted) {
  //     return a.isCompleted ? 1 : -1;
  //   }
  //   return a.priority - b.priority;
  // });

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.isCompleted !== b.isCompleted) {
      return a.isCompleted ? 1 : -1; // uncompleted first
    }
    // Use numeric values from mapping for comparison
    return priorityMap[a.priority] - priorityMap[b.priority];
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (editingTask) {
        const updated = await taskApi.updateTask(editingTask.id, formData);
        setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
      } else {
        const created = await taskApi.createTask(formData);
        setTasks((prev) => [...prev, created]);
      }
      resetForm();
    } catch (err) {
      alert("Failed to save task: " + err.message);
    }
  }

  function resetForm() {
    setEditingTask(null);
    setFormData({ name: "", priority: "MEDIUM", isCompleted: false });
  }

  function editTask(task) {
    setEditingTask(task);
    setFormData({ id: task.id, name: task.name, priority: task.priority, isCompleted: task.isCompleted });
  }

  async function toggleComplete(task) {
    try {
      const updated = await taskApi.updateTask(task.id, {
        ...task,
        isCompleted: !task.isCompleted,
      });
      setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    } catch (err) {
      alert("Failed to update completion: " + err.message);
    }
  }

  async function deleteTask(id) {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await taskApi.deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      alert("Failed to delete task: " + err.message);
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={{ textAlign: "center" }}>Do it</h1>

      <TaskForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        onCancel={resetForm}
        editing={!!editingTask}
      />

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading tasks...</p>
      ) : (
        <TaskList
          tasks={sortedTasks}
          onEdit={editTask}
          onDelete={deleteTask}
          onToggleComplete={toggleComplete}
        />
      )}
    </div>
  );
}
