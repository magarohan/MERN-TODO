import { useState } from 'react';

const TaskForm = () => {
    const [title, setTitle] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const validateDates = () => {
        if (new Date(startDate) > new Date(endDate)) {
            return "End date cannot be before start date.";
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationError = validateDates();
        if (validationError) {
            setError(validationError);
            return;
        }
        setLoading(true);
        setError(null);
        const task = { title, startDate, endDate, description };
        const response = await fetch('http://localhost:4000/api/tasks/', {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();
        setLoading(false);
        if (!response.ok) {
            setError(json.error);
        } else {
            setError(null);
            console.log('New task added', json);
            setTitle("");
            setStartDate("");
            setEndDate("");
            setDescription("");
            window.location.reload();  // Reload the page after the task is successfully added
        }
    };

    return (
        <>
            <form className="create" onSubmit={handleSubmit}>
                <h3>Enter Tasks</h3>
                <div>
                    <label>Title</label>
                    <input type="text"
                           onChange={(e) => setTitle(e.target.value)}
                           value={title}
                           required />
                </div>
                <div>
                    <label>Start date</label>
                    <input type="date"
                           onChange={(e) => setStartDate(e.target.value)}
                           value={startDate}
                           required />
                </div>
                <div>
                    <label>End date</label>
                    <input type="date"
                           onChange={(e) => setEndDate(e.target.value)}
                           value={endDate}
                           required />
                </div>
                <div>
                    <label>Description</label>
                    <input type="text"
                           onChange={(e) => setDescription(e.target.value)}
                           value={description}
                           required />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Adding Task..." : "Add Task"}
                </button>
            </form>
            {error && <div className='error'>{error}</div>}
        </>
    );
}

export default TaskForm;
