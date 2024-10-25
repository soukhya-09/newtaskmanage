const express = require("express")
const Task = require("../model/Task")
const { auth } = require("./Auth")
const router = express.Router()
const User = require("../model/User")
router.get('/getalltasks',auth,async(req,res)=>{
    try {
        const {email} =req.dataofuser ;

        const user = await User.findOne({email:email}).populate("tasks")
        const tasks = user.tasks
       
        res.json(tasks)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})


router.get('/gettaskbyid/:id',auth,async(req,res)=>{
    try {
        const task = await Task.findById(req.params.id)
        res.json(task)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})


router.post('/addtask', auth ,async (req, res) => {
    try {
        const { title, description } = req.body;
        const {email} = req.dataofuser;

        if (!title || !description) {
            return res.status(400).json({ message: "Title and description are required" });
        }
        const newTask = new Task({ title, description });
        await newTask.save();
        const savetask = await User.findOneAndUpdate({email:email},{$push:{tasks:newTask}})
        res.status(201).json(newTask);
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ error: error.message });
    }
});


router.put('/updatetask/:id',auth,async(req,res)=>{
    try {
        const {email} = req.dataofuser;
        const id = req.params.id;
        const {title,description,completed} = req.body;
        const updateTask = await Task.findByIdAndUpdate(req.params.id,req.body,{new:true})
          
        const alltasks = await User.findOne({email:email}).populate("tasks")


        res.json(alltasks)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})
  
router.delete('/deletetask/:id',auth,async(req,res)=>{
    try {
        await Task.findByIdAndDelete(req.params.id)
        res.json({message:'Task deleted'})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

module.exports= router