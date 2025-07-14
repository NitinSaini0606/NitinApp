
import React, { use, useState,useEffect } from 'react'
import { FaCheck, FaPencilAlt, FaPlus, FaSearch, FaTrash } from 'react-icons/fa'
import {ToastContainer} from 'react-toastify'
import { CreateTask , getAllTasks , deleteAllTasks , updateAllTasks} from '../Api'
import { notify } from '../Utils'


function TaskManger() {
    const [input,setInput] = useState('')
    const [tasks, setTasks] = useState([]);
    const [copyTasks , setCopyTasks] = useState([]);
    const [updateTask,setUpdateTask] = useState(null);
    const handleTask = () => {
        if(updateTask && input) {
            // update API call
            console.log("update api call")
            const obj = {
                taskName: input,
                isDone: updateTask.isDone,
                _id : updateTask._id
            }
            handleUpdate(obj);

        } else if(updateTask === null && input) {
            // create API call
            console.log("create api call")
            handleAddTask();
        }
    }

    useEffect(() => {
        if(updateTask) {
            setInput(updateTask.taskName);
        }
        
    } ,[updateTask])

    const handleAddTask = async () => {
        const obj = {
            taskName: input,
            isDone:false
        }
        try {
            const {success , message} = await CreateTask(obj);
            if(success) {
                notify(message, 'success');
            }
            else {
                notify(message, 'error');
            }
            setInput(''); 
            fetchAllTasks();
            
        }
        catch (err) {
            console.error(err);
            notify('Failed to create task', 'error');
        }
    }

    const fetchAllTasks = async () => {
        try {
            const {data} = await getAllTasks();
            setTasks(data);
            setCopyTasks(data);

        }

        catch (err) {
            console.error(err);
            notify('Failed to fetch tasks', 'error');
        }
    }

    useEffect(() => {
        fetchAllTasks();
    } , [])

    const handleDeleteTask = async (id) => {
        try {
            const {success , message} = await deleteAllTasks(id);
            if(success) {
                notify(message, 'success');
            }
            else {
                notify(message, 'error');
            }
            fetchAllTasks();
        }
        catch (err) {
            console.log(err);
            notify('Failed to delete task', 'error');
        }
    }

    const handleCheck = async (item) => {
        const {_id , isDone , taskName} = item;
        const obj = {
                taskName ,
                isDone: !isDone
            }
        try {
            const {success , message} = await updateAllTasks(_id , obj);
            
            if(success) {
                notify(message, 'success');
            }
            else {
                notify(message, 'error');
            }
            fetchAllTasks();
        }
        catch (err) {
            console.log(err);
            notify('Failed to update task', 'error');
        }
    }
    
    const handleUpdate =  async (item) => {
        const {_id , isDone , taskName} = item;
        const obj = {
                taskName ,
                isDone
            }
        try {
            const {success , message} = await updateAllTasks(_id , obj);
            
            if(success) {
                notify(message, 'success');
            }
            else {
                notify(message, 'error');
            }
            setUpdateTask(null); // reset edit mode
            setInput('');
            fetchAllTasks();
        }
        catch (err) {
            console.log(err);
            notify('Failed to update task', 'error');
        }
    }

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        const oldTasks = [...copyTasks];
        const results = oldTasks.filter((item) => item.taskName.toLowerCase().includes(term));
        setTasks(results);
        
    }


return (
    <>
        <div className="max-w-xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6 text-center">Task Manager</h1>
            <div className="flex flex-col gap-4 md:flex-row md:gap-6 mb-6">
                <div className="flex flex-1 gap-2">
                    <input
                        type="text"
                        placeholder="Add a new task"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button 
                    className="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-blue-700 flex items-center justify-center"
                    onClick={handleTask}
                    >
                        <FaPlus />
                    </button>
                </div>
                <div className="flex flex-1 gap-2 items-center">
                    <span className="text-gray-500 ">
                        <FaSearch size={20} />
                    </span>
                    <input
                        onChange={handleSearch}
                        type="text"
                        placeholder="Search tasks"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>
            {/* List of tasks */}
            <div>
                
                {
                    tasks.map((item) => (
                        <div key={item._id} className="flex items-center justify-between bg-white shadow-md rounded-md px-4 py-3 mb-2">
                            <span className={item.isDone ? "line-through text-gray-500" : "text-blue-800"}>
                                {item.taskName}
                            </span>
                            <div className="flex gap-2">
                                <button className="text-green-600 hover:bg-green-100 p-2 rounded-full flex items-center justify-center" title="Check"
                                onClick={() => handleCheck(item)}
                                >
                                    <FaCheck />
                                </button>
                                <button className="text-blue-600 hover:bg-blue-100 p-2 rounded-full flex items-center justify-center" title="Edit"
                                onClick={() => setUpdateTask(item)}
                                >
                                    <FaPencilAlt />
                                </button>
                                <button className="text-red-600 hover:bg-red-100 p-2 rounded-full flex items-center justify-center" title="Delete"
                                onClick={() => handleDeleteTask(item._id)}
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    </>
)
}

export default TaskManger
