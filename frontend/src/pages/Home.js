import {useState, useEffect} from 'react'

//components
import TaskDetails from '../components/TaskDetails'

const Home = ()=>{
    const [tasks, setTasks] = useState(null)
    const [error, setError] = useState("")

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
    
    return(
    <div className="home">
        <div className='tasks'>
            {tasks && tasks.map((task)=>(
                <TaskDetails key={task._id} task={task}/>
            ))}
        </div>
    </div>)
}

export default Home