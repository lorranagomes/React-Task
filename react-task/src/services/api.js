import Axios from "axios";

const api = Axios.create({
    baseURL: 'http://3.145.43.102:80'
})

export default api;
