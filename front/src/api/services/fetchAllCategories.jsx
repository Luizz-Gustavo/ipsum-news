import Api from '../api';

export const fetchAllCategories = async () => {
    try {
        const response = await Api.get('/all-categories');
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};