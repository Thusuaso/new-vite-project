import axios from 'axios';

export const api = axios.create({
    baseURL: "https://mekmar-aws-service.mekmar.com/",
    /baseURL: "http://localhost:5002",

})