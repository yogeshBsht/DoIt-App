import React from "react";
import { styles } from "../styles/commonStyles";

export default function TaskItem({ task, onEdit, onDelete, onToggleComplete }) {
  return (
    <li
      style={{
        ...styles.taskItem,
        backgroundColor: task.isCompleted ? "#e0e0e0" : "#fff",
        opacity: task.isCompleted ? 0.6 : 1,
      }}
    >
      <div>
        <strong>{task.name}</strong>{" "}
        <span style={{ fontWeight: "normal", marginLeft: 10 }}>
          (Priority: {task.priority})
        </span>
      </div>
      <div style={styles.taskActions}>
        <button onClick={() => onEdit(task)} style={styles.actionButton}>
          Edit
        </button>
        <button
          onClick={() => onToggleComplete(task)}
          style={{
            ...styles.actionButton,
            backgroundColor: task.isCompleted ? "#4caf50" : "#2196f3",
          }}
        >
          {task.isCompleted ? "Mark Incomplete" : "Mark Complete"}
        </button>
        <button
          onClick={() => onDelete(task.id)}
          style={{ ...styles.actionButton, backgroundColor: "#f44336" }}
        >
          Delete
        </button>
      </div>
    </li>
  );
}
