import React, { useState } from 'react';

const TaskDetails = ({ task, onDelete }) => {
  const [error, setError] = useState(null);

  const handleDelete = async (taskId) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/tasks/${taskId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete the task");
      }
      onDelete(taskId); // Call the onDelete callback
    } catch (error) {
      setError(error);
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="task-details">
      <h3>{task.title}</h3>
      <p>Start date: {task.startDate}</p>
      <p>End date: {task.endDate}</p>
      <p>Description: {task.description}</p>
      <p>Created at: {task.createdAt}</p>
      {error && <p className="error">{error.message}</p>}
      <button className="deleteButton" onClick={() => handleDelete(task._id)}>Delete</button>
    </div>
  );
}

export default TaskDetails;
