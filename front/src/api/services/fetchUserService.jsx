import Api from "../api";

export const fetchUsers = async () => {
    try {
        const response = await Api.get('/users');
        return response.data.map(user => ({
            id: user.id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            nickname: user.nickname,
            role: user.role.name,
            status: user.status,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }));
    } catch (error) {
        throw new Error('Failed to fetch users');
    }
}