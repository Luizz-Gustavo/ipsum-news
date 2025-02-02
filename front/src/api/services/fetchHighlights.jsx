import Api from "../api";

// FIND HIGHLIGHTS FOR BANNER COMPONENT
export const fetchHighlights = async () => {
    try {
        const response = await Api.get('/highlights');
        
        if (!response.data) {
            throw new Error('Data not found');
        }

        const highlights = response.data.map(post => ({
            id: post.id,
            title: post.title,
            imageUrl: post.imageUrl,
            videoLink: post.videoLink,
            category: post.category
        }));
        
        return highlights;
    } catch (error) {
        console.error('Error fetching highlights:', error);
        throw error;
    }
};

// FIND HIGHLIGHTS BY CATEGORY
export const fetchHighlightsByCategory = async (category) => {
    try {
        const response = await Api.get(`/highlights/${category}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching highlights by category:', error);
        throw error;
    }
}

// FIND ALL HIGHLIGHTS
export const fetchAllHighlights = async () => {
    try {
        const response = await Api.get('/all-highlights');
        return response.data;
    } catch (error) {
        console.error('Error fetching all highlights:', error);
        throw error;
    }
}