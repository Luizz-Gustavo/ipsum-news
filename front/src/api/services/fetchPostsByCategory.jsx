import Api from "../api";

export const fetchPostsByCategory = async (categorySlug) => {
    try {
        const response = await Api.get(`/categories/${categorySlug}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching posts by category:', error);
        throw error.response?.data?.error || 'Failed to fetch data';
    }
};