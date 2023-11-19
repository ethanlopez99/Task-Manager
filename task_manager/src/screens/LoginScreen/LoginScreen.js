import React from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";

const LoginScreen = ({ setUser }) => {
  const handleLogin = async ({ username, password }) => {
    console.log(username, password);
    const userAttempt = { username: username, password: password };
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/users/login",
        userAttempt
      );
      console.log(response);
      if (response.status === 200) {
        setUser(response.data.userID);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleRegister = async ({ newUsername, newEmail, newPassword }) => {
    const newUser = { username: newUsername, email: newEmail, password: newPassword };
    try {
      const response = await axios.post(
        "http://127.0.01:5000/api/users/register",
        newUser
      );
      if (response.status === 201) {
        setUser(response.data.userID);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={handleLogin}
      >
        <Form>
          <Field
            type="text"
            id="username"
            name="username"
            placeholder="Username"
          />
          <Field
            type="text"
            id="password"
            name="password"
            placeholder="Password"
          />
          <button type="submit">Log In</button>
        </Form>
      </Formik>
      <Formik
        initialValues={{ newUsername: "", newEmail: "", newPassword: "" }}
        onSubmit={handleRegister}
      >
        <Form>
          <Field
            type="text"
            id="newUsername"
            name="newUsername"
            placeholder="Username"
          />
          <Field
            type="text"
            id="newEmail"
            name="newEmail"
            placeholder="Email"
          />
          <Field
            type="text"
            id="newPassword"
            name="newPassword"
            placeholder="Password"
          />
          <button type="submit">Sign Up</button>
        </Form>
      </Formik>
    </>
  );
};

export default LoginScreen;
