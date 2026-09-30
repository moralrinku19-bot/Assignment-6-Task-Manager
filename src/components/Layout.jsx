import { Link, Outlet, useNavigate } from "react-router-dom";

function Layout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <div>
      <header>
        <h1>Task Manager</h1>

        <nav>
          <Link to="/dashboard">Dashboard</Link>{" "}
          <Link to="/tasks">Tasks</Link>{" "}
          <Link to="/tasks/add">Add Task</Link>{" "}
          <Link to="/completed">Completed</Link>{" "}

          <button onClick={logout}>Logout</button>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;