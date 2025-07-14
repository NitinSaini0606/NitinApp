import { API_URL } from "./Utils"


export const CreateTask = async (taskObj) => {
    const URL = `${API_URL}/tasks`;
    const options = {
        method : 'POST',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify(taskObj)
    };
    try {
        const result = await fetch(URL, options);
        const data = await result.json();
        return data;

    }
    catch(error) {
        return error;

    }

}



export const getAllTasks = async () => {
    const URL = `${API_URL}/tasks`;
    const options = {
        method : 'GET',
        headers: {
            'Content-type' : 'application/json'
        },
        
    };
    try {
        const result = await fetch(URL, options);
        const data = await result.json();
        return data;

    }
    catch(error) {
        return error;

    }

}

export const deleteAllTasks = async (id) => {
    const URL = `${API_URL}/tasks/${id}`;
    const options = {
        method : 'DELETE',
        headers: {
            'Content-type' : 'application/json'
        },
        
    };
    try {
        const result = await fetch(URL, options);
        const data = await result.json();
        return data;

    }
    catch(error) {
        return error;

    }

}

export const updateAllTasks = async (id , reqBody) => {
    const URL = `${API_URL}/tasks/${id}`;
    const options = {
        method : 'PUT',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify(reqBody)
        
    };
    try {
        const result = await fetch(URL, options);
        const data = await result.json();
        return data;

    }
    catch(error) {
        return error;

    }

}