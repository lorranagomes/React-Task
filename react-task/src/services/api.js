import Axios from "axios";

const api = Axios.create({
    baseURL: 'http://18.191.112.126:80'
})

export default api;
