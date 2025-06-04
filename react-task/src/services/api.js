import Axios from "axios";

const api = Axios.create({
    baseURL: 'http://3.135.185.109:80'
})

export default api;
