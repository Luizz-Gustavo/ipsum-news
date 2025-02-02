import Api from "../api";

export const fetchUserbyNickName = async (nickname) => {
    const response = await Api.get(`/user/${nickname}`);
    return response.data;
}   