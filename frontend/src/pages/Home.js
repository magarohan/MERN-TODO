// Home.js
import { useState, useEffect } from 'react';

// components
import TaskDetails from '../components/TaskDetails';
import TaskForm from '../components/TaskForm';

const Home = () => {
    const [tasks, setTasks] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/tasks');
                console.log(response); // Log the response
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const json = await response.json();
                setTasks(json);
            } catch (err) {
                setError(err.message);
                console.error('Failed to fetch tasks:', err);
            }
        };
        fetchTasks();
    }, []);

    const handleDeleteTask = (taskId) => {
        setTasks((prevTasks) => prevTasks.filter(task => task._id !== taskId));
    };

    return (
        <div className="home">
            <div className='tasks'>
                {tasks && tasks.map((task) => (
                    <TaskDetails key={task._id} task={task} onDelete={handleDeleteTask} />
                ))}
            </div>
            <TaskForm />
            {error && <p className="error">{error}</p>}
        </div>
    );
}

export default Home;
