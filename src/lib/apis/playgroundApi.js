import instance from './baseApi';

export const postPlayground = async (code, title, description) => {
    const response = await instance.post('/playgrounds', {
        code: code,
        title: title,
        description: description,
    });

    return response.data;
};

export const getAllPlayground = async () => {
    const { data } = await instance.get('/playgrounds');

    return data;
};

export const getPlaygroundDetail = async (id) => {
    const { data } = await instance.get(`/playgrounds/${id}`);

    return data;
};
