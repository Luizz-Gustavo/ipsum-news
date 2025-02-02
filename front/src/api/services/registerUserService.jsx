import Api from '../api';

export const registerUserService = async (name, lastName, nickname, email, password) => {
    try {
        const response = await Api.post(`/register`, {
            name,
            lastName,
            nickname,
            email,
            password
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.error);
        }
        throw new Error('Network error occurred');
    }
};