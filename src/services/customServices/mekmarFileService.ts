import axios from 'axios';

export const api = axios.create({
    baseURL: "https://file-service.mekmar.com",
    //baseURL: "http://localhost:5001",
    headers: {
        "Content-Type":"multipart/form-data",
    },
})