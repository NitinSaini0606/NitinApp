const TaskModel = require("../Models/TaskModel");


const createTask = async (req,res) => {
    const data = req.body;

    try {
        const model = new TaskModel(data);
        await model.save();
        res.status(201).json({
            message: "Task Created Successfully",
            success: true,
        })
    }

    catch (error) {
        res.status(500).json({
            message: "Request Failed",
            success: false
        })
    }
}

const getAllTasks = async (req,res) => {
    try {
        const data = await TaskModel.find();
        res.status(200).json({
            message: "Tasks Retrieved Successfully",
            success: true,
            data: data
        })
    }

    catch (error) {
        res.status(500).json({
            message: "Request Failed",
            success: false
        })
    }

}


const updateTask = async (req,res) => {
    const {id} = req.params;
    const body = req.body;
    const obj = {$set: {...body}};
    const data = await TaskModel.findByIdAndUpdate(id,obj);
    try {
        const {id} = req.params;
        const body = req.body;
        const obj = {$set: {...body}};
        const data = await TaskModel.findByIdAndUpdate(id,obj);
        res.status(200).json({
            message: "Task Updated Successfully",
            success: true,
            data: data
        })
    }
    catch (error) {
        res.status(500).json({
            message: "Request Failed",
            success: false
        })
    }
}

const deleteTask = async (req,res) => {
    
    try {
        const {id} = req.params;
        const data = await TaskModel.findByIdAndDelete(id);
        res.status(200).json({
            message: "Task Deleted Successfully",
            success: true,
            data: data
        })
    }
    catch (error) {
        res.status(500).json({
            message: "Request Failed",
            success: false
        })
    }
}

       


module.exports = {
    createTask,
    getAllTasks,
    updateTask,
    deleteTask
}