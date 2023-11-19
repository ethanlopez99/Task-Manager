import React from "react";
import Task from "../Task/task";

import "./bucket.css";

const Bucket = ({ title, tasks, updateTaskStatus, removeTask }) => {
  return (
    <div className="bucket_container">
      <h1>{title}</h1>
      {tasks.map((task) => (
        <Task
          task={task}
          updateTask={updateTaskStatus}
          removeTask={removeTask}
        />
      ))}
    </div>
  );
};

export default Bucket;
