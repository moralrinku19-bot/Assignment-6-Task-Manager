import { Link } from "react-router-dom";

function CompletedTasks({ tasks }) {
  const completedTasks = tasks.filter(
    (task) => task.status === "Closed"
  );

  return (
    <div>
      <h1>Completed Tasks</h1>

      {completedTasks.length === 0 ? (
        <p>No completed tasks.</p>
      ) : (
        completedTasks.map((task) => (
          <div className="task-card" key={task.id}>

            <h2>{task.header}</h2>

            <p>
              <strong>Description:</strong>{" "}
              {task.description}
            </p>

            <p>
              <strong>Priority:</strong>{" "}
              {task.priority}
            </p>

            <p>
              <strong>Category:</strong>{" "}
              {task.category}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {task.status}
            </p>

            <Link to={`/tasks/${task.id}`}>
              <button>View Details</button>
            </Link>

          </div>
        ))
      )}
    </div>
  );
}

export default CompletedTasks;