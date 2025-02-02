import Api from "../api";

function verifyCodeService(email, code) {
    return Api.post('/verify-code', { email, code });
}

export default verifyCodeService;