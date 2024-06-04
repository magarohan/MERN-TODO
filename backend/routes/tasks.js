const express = require('express')
const {createTask, getTask, getTasks, deleteTask, updateTask} = require('../controllers/taskContorller')

const router = express.Router()

//get all tasks
router.get('/', getTasks)

//get a task
router.get('/:id', getTask)

//post a new task
router.post ('/', createTask)

//update a task
router.patch('/:id', updateTask)

//delete a task
router.delete('/:id', deleteTask)


module.exports = router