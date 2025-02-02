import api from "../api";

export const fetchCategories = async () => {
    const response = await api.get('/categories');
    return response.data;
}