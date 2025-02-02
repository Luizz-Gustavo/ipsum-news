import Api from '../api';

export const createCategoryService = async (categoryData) => {
    try {
        const response = await Api.post('/create-category', categoryData);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.error || 'Failed to create category';
        throw new Error(errorMessage);
    }
};