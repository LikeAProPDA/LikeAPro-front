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

export const isDuplicateNickname = async (nickname) => {
    const { data } = await instance.get('/users/duplicate-nickname', { params: { nickname: nickname } });

    return data;
};

export const sendVerifyEmail = async (email) => {
    const { data } = await instance.post(
        '/users/verify-email',
        {},
        {
            params: {
                email: email,
            },
        }
    );

    return data;
};

export const isVerifyEmail = async (email, verifyCode) => {
    const { data } = await instance.get('/users/verify-email', { params: { email: email, code: verifyCode } });

    return data;
};

export const isDuplicateBackjoonId = async (backjoonId) => {
    const { data } = await instance.get('/users/duplicate-backjoonid', { params: { backjoonid: backjoonId } });

    return data;
};

export const signUp = async (nickname, email, password, backjoonId) => {
    const { data } = await instance.post('/users/sign-up', {
        nickname: nickname,
        password: password,
        email: email,
        backjoonId: backjoonId,
    });

    return data;
};

export default {
    login,
    autoLogin,
    logout,
    isDuplicateNickname,
    isDuplicateBackjoonId,
    sendVerifyEmail,
    isVerifyEmail,
};
