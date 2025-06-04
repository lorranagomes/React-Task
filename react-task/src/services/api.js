import Axios from "axios";

const api = Axios.create({
    baseURL: 'http://3.15.17.95:80'
})

export default api;
