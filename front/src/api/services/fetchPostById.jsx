import Api from "../api";

export const fetchPostById = async (postId) => {
    try {
        const response = await Api.get(`/conteudo/${postId}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar post por ID:', error);
        throw new Error('Falha ao buscar dados');
    }
};