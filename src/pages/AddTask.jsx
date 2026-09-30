import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddTask({ addTask }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    header: "",
    description: "",
    priority: "Medium",
    category: "Academic",
    dueDate: "28 Aug 2026",
    status: "Raised",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.header || !formData.description) {
      alert("Please fill all required fields");
      return;
    }

    const newTask = {
      ...formData,

      // Automatically generated date and time
      raisedDate: new Date().toLocaleString(),
    };

    addTask(newTask);

    alert("Task added successfully!");

    navigate("/tasks");
  };

  return (
    <div>
      <h1>Add Task</h1>

      <form onSubmit={handleSubmit}>

        <label>Task Header</label>
        <input
          type="text"
          name="header"
          value={formData.header}
          onChange={handleChange}
          placeholder="Enter task header"
        />

        <label>Task Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter task description"
        />

        <label>Priority</label>
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <label>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Academic">Academic</option>
          <option value="Personal">Personal</option>
        </select>

        <label>Due Date</label>
        <input
          type="text"
          value="28 Aug 2026"
          readOnly
        />

        <label>Status</label>
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

        <button type="submit">
          Add Task
        </button>

      </form>
    </div>
  );
}

export default AddTask;