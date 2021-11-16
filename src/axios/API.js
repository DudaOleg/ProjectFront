import axios from 'axios';

const axiosInstance = axios.create({baseURL: 'http://localhost:5000'});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");

        if (accessToken) {

            config.headers['Authorization'] = accessToken;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (err) => {
        const originalConfig = err.config;

        const refreshToken = localStorage.getItem('refreshToken');

        if (refreshToken) {

            if (originalConfig.url !== "/authorization/refresh" && err.response) {

                if (err.response.status === 401 && !originalConfig._retry) {
                    originalConfig._retry = true;

                    try {
                        const response = await axiosInstance.post("/authorization/refresh", {refreshToken});
                        localStorage.setItem('accessToken', response.data.accessToken);
                        localStorage.setItem('refreshToken', response.data.refreshToken);
                        return axiosInstance(originalConfig);
                    } catch (_error) {
                        if (_error.response.status === 401) {
                            localStorage.clear();
                            return window.location.href = '/authorization'
                        }
                        return Promise.reject(_error);
                    }
                }
            }
        }
        return Promise.reject(err);
    }
);


const getAllUser = () => axiosInstance.get('/users');
const createUser = data => axiosInstance.post('/users', data);
const updateUser = (id, data) => axiosInstance.patch(`/users/${id}`, data);
const deleteUser = (id) => axiosInstance.delete(`/users/${id}`);

const authUser = data => axiosInstance.post('/authorization', data);
const exitUser = data => axiosInstance.post('/authorization/exit', data);

export { createUser, updateUser, deleteUser, getAllUser, authUser, exitUser }