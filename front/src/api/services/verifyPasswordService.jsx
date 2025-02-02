import Api from "../api";

const verifyPasswordService = async (userId, currentPassword) => {
    try {
        const response = await Api.post('/verify-password', {
            userId,
            currentPassword
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || 'Operation failed, please try again';
    }
};

export default verifyPasswordService;