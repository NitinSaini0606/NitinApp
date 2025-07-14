const express = require('express');
// 
const { createTask, deleteTask } = require('../Controllers/TaskController');
const { getAllTasks } = require('../Controllers/TaskController');
const { updateTask } = require('../Controllers/TaskController');

const router = express.Router();


//Get Tasks
router.get('/' , getAllTasks);

//Create Task
router.post('/' , createTask)

//Update Task
router.put('/:id', updateTask);

//delete Task
router.delete('/:id', deleteTask);




module.exports = router;