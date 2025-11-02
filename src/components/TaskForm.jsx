import React from "react";
import { styles } from "../styles/commonStyles";

export default function TaskForm({ formData, setFormData, onSubmit, onCancel, editing }) {
  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : (name === "priority" ? value : value),
    }));
  }

  return (
    <form onSubmit={onSubmit} style={styles.form}>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Task Name"
        required
        style={styles.input}
      />
      <select
        name="priority"
        value={formData.priority}
        onChange={handleChange}
        style={styles.select}
      >
        {["HIGH", "MEDIUM", "LOW"].map((p) => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>
      <button type="submit" style={styles.button}>
        {editing ? "Update Task" : "Add Task"}
      </button>
      {editing && (
        <button type="button" onClick={onCancel} style={styles.cancelButton}>
          Cancel
        </button>
      )}
    </form>
  );
}
