import Api from "../api";

const handleApiResponse = (response) => {
    if (response.status === 201) {
        return response.data;
    }
    if (response.data && response.data.errors) {
        throw new Error(response.data.errors.join(', '));
    }
    throw new Error(`Failed to create the post. Status code: ${response.status}`);
};

const processError = (error) => {
    if (error.response) {
        if (error.response.status === 403) {
            throw new Error('Acesso negado: permissões insuficientes.');
        }
        const errorMessage = error.response.data.errors
            ? error.response.data.errors.join(', ')
            : error.response.data.error || 'Unknown server error.';
        throw new Error(errorMessage);
    }
    if (error.request) {
        throw new Error('No server response. Check your network connection.');
    }
    throw new Error(`${error.message}`);
};

export const NewPostService = async (data) => {
    try {
        // Validation of the data before sending
        if (!data.title?.trim()) {
            throw new Error('The title is required');
        }
        if (!data.videoLink?.trim()) {
            throw new Error('The video link is required');
        }
        if (!data.categoryId) {
            throw new Error('The category is required');
        }
        if (!data.content?.trim()) {
            throw new Error('The content is required');
        }

        const response = await Api.post("/new-post", data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return handleApiResponse(response);
    } catch (error) {
        throw processError(error);
    }
};