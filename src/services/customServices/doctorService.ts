import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:5000/',
  // baseURL: 'https://doktor-servis.mekmar.com/',

})

