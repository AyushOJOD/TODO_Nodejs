import Errorhandler from "../middlewares/error.js";
import { Task } from "../models/task.js";


export const newTask = async(req,res,next) => {
    try {
        const {title, description} = req.body;

    await Task.create({
        title,
        description,
        user: req.user
    });

    res.status(201).json({
        success: true,
        message: "Task Created"
    });
    } catch (error) {
        next(error);
    }
}

export const getMyTasks = async(req, res, next) => {
    try {
        const userid = req.user._id;

    const task = await Task.find({user: userid});   // .find method gives an array 

    res.status(201).json({
        success: true,
        task
    }) 
    } catch (error) {
        next(error);
    }
}

export const updateTask = async(req,res,next) => {
    try {
    const {id} = req.params;

    const task = await Task.findById(id);

    if(!task) return next(new Errorhandler("Task Not Found", 404));
    
    task.isCompleted = !task.isCompleted;

    await task.save();

    res.status(200).json({
        success: true,
        message:"Updated Successfully",
    });
    } catch (error) {
        next(error);
    }
}


export const deleteTask = async(req,res,next) => {
    try {
        const {id} = req.params;

    const task = await Task.findById(id);

    if(!task) return next(new Errorhandler("Task not Found", 404));
    

    await task.deleteOne();

    res.status(200).json({
        success: true,
        message: "Task Deleted"
    })
    } catch (error) {
        next(error);
    }
}

