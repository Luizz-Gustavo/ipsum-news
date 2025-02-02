import Api from "../api";

function resetPasswordService(email, code, newPassword) {
    return Api.post('/reset-password', { email, code, newPassword });
}

export default resetPasswordService;