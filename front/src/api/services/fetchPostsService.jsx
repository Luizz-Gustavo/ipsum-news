import Api from "../api";

export const fetchPosts = async () => {
  try {
    const response = await Api.get('/posts-list');
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};
