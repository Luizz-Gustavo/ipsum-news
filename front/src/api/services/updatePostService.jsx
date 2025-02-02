import Api from '../api';

export const updatePostService = async (postId, updateData) => {
    try {
        const response = await Api.patch(`/update-post/${postId}`, updateData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || 'Error updating the post.';
    }
};