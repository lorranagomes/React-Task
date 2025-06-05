import Axios from "axios";

const api = Axios.create({
    baseURL: 'http://10.6.2.69:80'
})

export default api;
