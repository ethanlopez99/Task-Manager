import { useState } from "react";
import TasksScreen from "./screens/TasksScreen/TasksScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      {user ? <TasksScreen user={user} /> : <LoginScreen setUser={setUser} />}
    </>
  );
}

export default App;
