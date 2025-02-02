import Api from "../api";

const disablePostService = async (postId) => {
    try {
        const response = await Api.patch(`/update-post/${postId}`, { status: false }, {
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao desativar a publicação:', error);
        throw error.response?.data?.error || 'Erro ao desativar a publicação.';
    }
};

export default disablePostService;