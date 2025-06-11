import Axios from "axios";

const api = Axios.create({
    baseURL: 'http://3.147.46.159:80'
})

export default api;
