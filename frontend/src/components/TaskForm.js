import {useState} from 'react';

const TaskForm = () => {
    const [title, setTitle] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const task = {title, startDate, endDate, description};
        const response = await fetch('http://localhost:4000/api/tasks/', {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();
        if (!response.ok) {
            setError(json.error);
        }
        if (response.ok) {
            setError(null);
            console.log('new task added', json);
        }
        setTitle("");
        setStartDate("");
        setEndDate("");
        setDescription("");
    };

    return (
        <>
            <form className="create" onSubmit={handleSubmit}>
                <h3>Enter Tasks</h3>
                <label>Title</label>
                <input type="text"
                       onChange={(e) => setTitle(e.target.value)}
                       value={title}/>

                <label>Start date</label>
                <input type="text"
                       onChange={(e) => setStartDate(e.target.value)}
                       value={startDate}/>

                <label>End date</label>
                <input type="text"
                       onChange={(e) => setEndDate(e.target.value)}
                       value={endDate}/>

                <label>Description</label>
                <input type="text"
                       onChange={(e) => setDescription(e.target.value)}
                       value={description}/>
                <button>Add Task</button>
            </form>
            {error && <div className='error'>{error}</div>}
        </>
    );
}

export default TaskForm;