import { Link } from "react-router-dom";
import { useState } from "react";

function Tasks({ tasks, deleteTask, completeTask }) {
  const [filter, setFilter] = useState("All");

  const filteredTasks =
    filter === "All"
      ? tasks
      : tasks.filter((task) => task.status === filter);

  return (
    <div>
      <h1>Tasks</h1>

      <div>
        <label>Filter by Status: </label>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Raised">Raised</option>
          <option value="Pending">Pending</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      <br />

      {filteredTasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        filteredTasks.map((task) => (
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
              <strong>Raised:</strong>{" "}
              {task.raisedDate}
            </p>

            <p>
              <strong>Due:</strong>{" "}
              {task.dueDate}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {task.status}
            </p>

            <Link to={`/tasks/${task.id}`}>
              <button>View</button>
            </Link>

            {task.status !== "Closed" && (
              <button
                onClick={() => completeTask(task.id)}
              >
                Complete
              </button>
            )}

            <button
              onClick={() => {
                if (window.confirm("Delete this task?")) {
                  deleteTask(task.id);
                }
              }}
            >
              Delete
            </button>

          </div>
        ))
      )}
    </div>
  );
}

export default Tasks;