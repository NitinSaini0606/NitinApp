import {toast} from 'react-toastify';

export const notify = (message,type) => {
    toast[type](message);
}

export const API_URL = 'https://nitin-app-apiback.vercel.app';


// http://localhost:3000
// https://taskmanager-1backenddep1.onrender.com
