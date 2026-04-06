import axios from 'axios';

export const inventarioAxios = axios.create({
    baseURL: "http://localhost:4000/api"
});