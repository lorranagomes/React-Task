import Axios from "axios";

const api = Axios.create({
    baseURL: 'http://3.135.191.25:80'
})

export default api;
