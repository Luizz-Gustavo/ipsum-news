import Api from "../api";

export const fetchLatestPosts = async (page = 1, limit = 10) => {
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));

        const response = await Api.get(`/latest-posts?page=${page}&limit=${limit}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar últimas publicações:', error);
        throw error;
    }
};