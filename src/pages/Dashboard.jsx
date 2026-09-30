import { Link } from "react-router-dom";

function Dashboard({ tasks }) {
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Closed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  return (
    <div>
      <h1>Dashboard</h1>

      <h2>Welcome to Task Manager!</h2>

      <div className="dashboard-cards">
        <div>
          <h3>Total Tasks</h3>
          <p>{totalTasks}</p>
        </div>

        <div>
          <h3>Pending Tasks</h3>
          <p>{pendingTasks}</p>
        </div>

        <div>
          <h3>Completed Tasks</h3>
          <p>{completedTasks}</p>
        </div>
      </div>

      <Link to="/tasks/add">
        <button>Add New Task</button>
      </Link>
    </div>
  );
}

export default Dashboard;