const TaskDetails= ({task})=>{
    return(
        <div className="task-details">
            <h3>{task.title}</h3>
            <p>start date: {task.startDate}</p>
            <p>end date: {task.endDate}</p>
            <p>description: {task.description}</p>
            <p>created at: {task.createdAt}</p>
        </div>
    )
}

export default TaskDetails