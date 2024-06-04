const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const taskRoutes = require('./routes/tasks')
require('dotenv').config()


//express app
const app = express()
app.use(cors())
app.use(express.json())

//middleware
app.use((req,res, next)=>{
    console.log(req.path, req.method)
    next()
})

//route
app.use('/api/tasks/',taskRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        //listen to request
        app.listen(process.env.PORT, ()=>{
        console.log('Server is running on :', process.env.PORT)
    })
    })
    .catch((error)=>{
        console.log(error)
    })

