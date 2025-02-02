import Api from "../api";

function sendMailCodeService(email) {
    return Api.post('/send-mailcode', { email });
}

export default sendMailCodeService; 