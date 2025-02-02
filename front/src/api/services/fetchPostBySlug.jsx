import Api from "../api";

export const fetchPostBySlug = async (path) => {
    try {
        const response = await Api.get(`/${path}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Falha ao buscar dados';
    }
};