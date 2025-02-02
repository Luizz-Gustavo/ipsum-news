import Api from "../api";

export const enableCategoryService = async (id) => {
    try {
        const response = await Api.put(`/enable-category/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Failed to enable category');
    }
}