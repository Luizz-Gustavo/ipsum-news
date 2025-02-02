import Api from "../api";

export const disableCategoryService = async (id) => {
    try {
        const response = await Api.put(`/disable-category/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Failed to disable category');
    }
}