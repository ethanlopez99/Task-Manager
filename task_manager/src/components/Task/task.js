import React, { useState } from "react";
import Tag from "../Tag/tag";
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";

import "./task.css";

const Task = ({ task, updateTask, removeTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(task.name);

  const handleChange = () => {
    if (task.status !== "Completed") {
      updateTask(task.id, "status", "Completed");
    } else {
      updateTask(task.id, "status", "To Do");
    }
  };

  const handleNameChange = () => {
    updateTask(task.id, "name", editedName);
    setIsEditing(false);
  };

  const handleDelete = () => {
    removeTask(task.id);
  };

  return (
    <div className="task_container">
      <div className="task_tags">
        {task.tags.map((tag) => (
          <Tag tag={tag} />
        ))}
        {isEditing ? (
          <>
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
            <button onClick={handleNameChange}>Save</button>
          </>
        ) : (
          <>
            <input
              type="checkbox"
              id={`checkbox-${task.id}`}
              checked={task.status === "Completed"}
              onChange={handleChange}
            />
            <MdDelete size={20} onClick={handleDelete} />
            <FaPen size={20} onClick={() => setIsEditing(true)} />
          </>
        )}
      </div>
      <h1
        style={{
          textDecoration: task.status === "Completed" ? "line-through" : "none",
        }}
      >
        {task.name}
      </h1>
      <p>{task.description}</p>
    </div>
  );
};

export default Task;
