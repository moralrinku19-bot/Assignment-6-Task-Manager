import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import AddTask from "./pages/AddTask";
import TaskDetails from "./pages/TaskDetails";
import CompletedTasks from "./pages/CompletedTasks";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks((previousTasks) => [
      ...previousTasks,
      {
        ...task,
        id: Date.now(),
      },
    ]);
  };

  const updateTask = (updatedTask) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== id)
    );
  };

  const completeTask = (id) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? { ...task, status: "Closed" }
          : task
      )
    );
  };

  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          {/* Nested Routes */}
          <Route index element={<Navigate to="/dashboard" replace />} />

          <Route
            path="dashboard"
            element={<Dashboard tasks={tasks} />}
          />

          <Route
            path="tasks"
            element={
              <Tasks
                tasks={tasks}
                deleteTask={deleteTask}
                completeTask={completeTask}
              />
            }
          />

          <Route
            path="tasks/add"
            element={<AddTask addTask={addTask} />}
          />

          {/* Dynamic Route */}
          <Route
            path="tasks/:id"
            element={
              <TaskDetails
                tasks={tasks}
                updateTask={updateTask}
                deleteTask={deleteTask}
                completeTask={completeTask}
              />
            }
          />

          <Route
            path="completed"
            element={<CompletedTasks tasks={tasks} />}
          />
        </Route>

        {/* Unknown URL */}
        <Route
          path="*"
          element={<Navigate to="/dashboard" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;