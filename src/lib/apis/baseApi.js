import axios from 'axios';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const instance = axios.create({
    baseURL: SERVER_URL,
    withCredentials: true,
});

instance.interceptors.request.use(
    function (config) {
        // request처리 로직 (header 등)
        return config;
    },
    function (error) {
        // 요청 오류시 처리 로직
        console.error(error);
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    function (response) {
        // response처리 로직
        return response;
    },
    function (error) {
        // error처리 로직
        return Promise.reject(error);
    }
);

export default instance;
