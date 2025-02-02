import Api from "../api";

export const changePasswordService = async (userId, currentPassword, newPassword) => {
    try {
        const response = await Api.post('/change-password', {
            userId,
            currentPassword,
            newPassword
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || 'Failed to change password';
    }
};