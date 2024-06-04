const Task = require('../models/taskModel')
const mongoose = require('mongoose')

//get all tasks
const getTasks = async(req,res)=>{
    const tasks = await Task.find({}).sort({createdAt: -1})
    res.status(200).json(tasks)
}

//get single task
const getTask = async(req,res)=>{
    const {id} = req.params
    const task = await Task.findById(id)
    if(!task){
        res.status(404).json({error: 'No such task'})
    }
    res.status(200).json(task)
}


//create a new task
const createTask = async(req,res)=>{
    const {title, description, startDate, endDate} = req.body

    try{
        const task =await Task.create({title, description, startDate, endDate})
        res.status(200).json(task)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//delete a task
const deleteTask = async(req,res)=>{
    const {id} = req.params
    try{
        const task = await Task.findOneAndDelete({_id: id})
        res.status(200).json(task)
    }catch{
        res.status(400).json({error: error.message})
    }
}

//update a task
const updateTask = async(req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: 'task not found'})
    }
    try{
        const task = await Task.findOneAndUpdate({_id:id}, {...req.body})
        res.status(200).json(task)
    }catch{
        res.status(400).json({error: error.message})
    }
}



module.exports={
    createTask,getTasks,getTask, deleteTask, updateTask
}