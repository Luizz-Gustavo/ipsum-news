import Api from '../api';

const handleLoginError = (error) => {
    const isRateLimitError = error.response?.status === 429;
    const isUserNotFoundError = error.response?.data?.code === 'USER_NOT_FOUND';
    const isInvalidPasswordError = error.response?.data?.code === 'INVALID_PASSWORD';

    if (isRateLimitError) {
        throw new Error(error.response.data.error);
    }

    if (isUserNotFoundError) {
        throw new Error('Invalid Credentials');
    }

    if (isInvalidPasswordError) {
        throw {
            message: 'Invalid Credentials',
            shouldCountAttempt: true
        };
    }

    throw new Error('An error occurred during login');
};

const handleLogoutError = (error) => {
    if (error.response) {
        throw new Error(error.response.data.error);
    }
    throw new Error('Network error occurred');
};

export const loginService = async (identifier, password) => {
    try {
        const response = await Api.post('/login', { identifier, password });
        return response.data;
    } catch (error) {
        handleLoginError(error);
    }
};

export const logoutService = async () => {
    try {
        const response = await Api.post(`/logout`, {});
        return response.data;
    } catch (error) {
        handleLogoutError(error);
    }
};