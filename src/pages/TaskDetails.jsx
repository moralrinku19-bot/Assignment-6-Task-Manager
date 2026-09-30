import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

function TaskDetails({
  tasks,
  updateTask,
  deleteTask,
  completeTask,
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const task = tasks.find(
    (task) => task.id.toString() === id
  );

  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(task);

  if (!task) {
    return (
      <div>
        <h1>Task Not Found</h1>
        <button onClick={() => navigate("/tasks")}>
          Back to Tasks
        </button>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const saveChanges = () => {
    updateTask(formData);
    setEditing(false);
    alert("Task updated successfully!");
  };

  return (
    <div>
      <h1>Task Details</h1>

      <p>
        <strong>Task ID:</strong> {id}
      </p>

      {editing ? (
        <div>

          <input
            name="header"
            value={formData.header}
            onChange={handleChange}
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="Academic">Academic</option>
            <option value="Personal">Personal</option>
          </select>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Raised">Raised</option>
            <option value="Pending">Pending</option>
            <option value="Closed">Closed</option>
          </select>

          <br /><br />

          <button onClick={saveChanges}>
            Save Changes
          </button>

          <button onClick={() => setEditing(false)}>
            Cancel
          </button>

        </div>
      ) : (
        <div>

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
            <strong>Raised Date:</strong>{" "}
            {task.raisedDate}
          </p>

          <p>
            <strong>Due Date:</strong>{" "}
            {task.dueDate}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {task.status}
          </p>

          <button onClick={() => setEditing(true)}>
            Edit
          </button>

          {task.status !== "Closed" && (
            <button
              onClick={() => completeTask(task.id)}
            >
              Complete
            </button>
          )}

          <button
            onClick={() => {
              deleteTask(task.id);
              navigate("/tasks");
            }}
          >
            Delete
          </button>

        </div>
      )}

      <br />

      <button onClick={() => navigate("/tasks")}>
        Back to Tasks
      </button>
    </div>
  );
}

export default TaskDetails;