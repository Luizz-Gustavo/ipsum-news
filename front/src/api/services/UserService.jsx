import Api from '../api';

export const getUserById = async (userId) => {
    try {
        const response = await Api.get(`/user/${userId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const createUser = async (name, lastName, nickname, email, role, password) => {
    try {
        const response = await Api.post('/create-user', {
            name,
            lastName,
            nickname,
            email,
            role,
            password
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const updateUser = async (userId, userData) => {
    try {
        const response = await Api.patch(`/update-user/${userId}`, userData);
        if (!response.data) {
            throw new Error('No data received from server');
        }
        return response.data;
    } catch (error) {
        console.error('Update user error:', error);
        if (error.response?.data?.error) {
            throw new Error(error.response.data.error);
        }
        throw new Error('Failed to update user');
    }
};

export const disableUser = async (userId) => {
    try {
        const response = await Api.put(`/disable-user/${userId}`, { status: false });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const deleteUser = async (userId) => {
    try {
        const response = await Api.delete(`/delete-user/${userId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};