import { useEffect, useState } from "react";
import "./TasksScreen.css";
import { Formik, Form, Field } from "formik";
import axios from "axios";

import Bucket from "../../components/Bucket/bucket";

function TasksScreen({ user }) {
  const [tasks, setTasks] = useState([]);

  console.log(user);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const userToken = {
      user_id: user,
    };
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/tasks/tasks",
        userToken
      );
      console.log(response);
      setTasks(response.data.tasks);
    } catch (error) {
      console.error("Error fetching tasks: ", error.message);
    }
  };

  const updateTask = async (taskID, statusToChange, newStatus) => {
    const updatedFields = { [statusToChange]: newStatus };

    try {
      const response = await axios.patch(
        `http://127.0.0.1:5000/api/tasks/tasks/${taskID}`,
        updatedFields
      );
      console.log(response.data.message);
      fetchTasks();
    } catch (error) {
      console.error("Error updating task: ", error.message);
    }
  };

  const removeTask = async (taskID) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:5000/api/tasks/tasks/${taskID}`
      );
      console.log(response.data.message);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task: ", error.message);
    }
  };

  const addTask = async ({ name, description }) => {
    const new_task = {
      status: "To Do",
      name: name,
      description: description,
      user_id: user,

      // tags: tags.split(",").map((tag) => tag.trim()) // Ready for inclusion of tags
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/tasks/create_task",
        new_task
      );
      fetchTasks();
      console.log(response.data.message);
    } catch (error) {
      console.error("Error: ", error.message);
    }
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
      <Formik initialValues={{ name: "", description: "" }} onSubmit={addTask}>
        <Form>
          <Field type="text" id="name" name="name" placeholder="Task Name" />
          <Field
            type="text"
            id="description"
            name="description"
            placeholder="Description (Optional)"
          />
          <button type="submit">Add Task</button>
        </Form>
      </Formik>
    </div>
  );
}

export default TasksScreen;
