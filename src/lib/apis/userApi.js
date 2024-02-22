import instance from './baseApi';

export const login = async ({ email, password }) => {
    const response = await instance.post('/users/login', { email: email, password });

    return response.data;
};

export const autoLogin = async () => {
    const response = await instance.get('/users/login');

    return response.data;
};

export const logout = async () => {
    const response = await instance.post('/users/logout');

    return response.data;
};

export default {
    login,
    autoLogin,
    logout,
};
