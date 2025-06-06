import Axios from "axios";

const api = Axios.create({
    baseURL: 'http://18.119.161.231:80'
})

export default api;
