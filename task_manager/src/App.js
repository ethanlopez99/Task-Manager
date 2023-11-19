import { useState } from "react";
import "./App.css";
import { Formik, Form, Field } from "formik";

import Bucket from "./components/Bucket/bucket";

const initialTasks = [
  {
    id: 1,
    name: "Wash Dishes",
    status: "Completed",
    tags: [{ text: "High Priority", color: "red" }],
    description: "Wash & dry dishes and cutlery",
  },
  {
    id: 2,
    name: "Clean Carpet",
    status: "To Do",
    tags: [
      { text: "High Priority", color: "red" },
      { text: "John's Task", color: "green" },
    ],
    description: "",
  },
];

function App() {
  const [tasks, setTasks] = useState(initialTasks);

  const updateTask = (taskID, statusToChange, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskID ? { ...task, [statusToChange]: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  const removeTask = (taskID) => {
    const filteredTasks = tasks.filter((task) => task.id !== taskID);
    setTasks(filteredTasks);
  };

  const addTask = ({ name, tags }) => {
    const new_task = {
      id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
      status: "To Do",
      name: name,
      tags: tags.split(",").map((tag) => tag.trim()),
    };
    setTasks([...tasks, new_task]);
  };

  return (
    <div className="app_container">
      <Bucket
        title="To Do"
        tasks={tasks.filter((task) => task.status === "To Do")}
        updateTaskStatus={updateTask}
        removeTask={removeTask}
      />

      <Bucket
        title="Completed"
        tasks={tasks.filter((task) => task.status === "Completed")}
        updateTaskStatus={updateTask}
        removeTask={removeTask}
      />
      <Formik initialValues={{ name: "", tags: "" }} onSubmit={addTask}>
        <Form>
          <Field type="text" id="name" name="name" placeholder="Task Name" />
          <Field
            type="text"
            id="tags"
            name="tags"
            placeholder="Tags (Optional)"
          />
          <button type="submit">Add Task</button>
        </Form>
      </Formik>
    </div>
  );
}

export default App;
