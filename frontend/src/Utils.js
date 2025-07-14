import {toast} from 'react-toastify';

export const notify = (message,type) => {
    toast[type](message);
}

export const API_URL = 'http://localhost:3000';


// http://localhost:3000
// https://taskmanager-1backenddep1.onrender.com