import React from "react";
import TaskItem from "./TaskItem";
import { styles } from "../styles/commonStyles";

export default function TaskList({ tasks, onEdit, onDelete, onToggleComplete }) {
  if (tasks.length === 0) {
    return <p style={{ textAlign: "center" }}>No tasks found. Add some above!</p>;
  }

  return (
    <ul style={styles.taskList}>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </ul>
  );
}
