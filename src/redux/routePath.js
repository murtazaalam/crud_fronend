const URL = "http://localhost:8081/v1/";

const URL_ENUM = {
    USERS: URL + "users",
    LOGIN: URL + "auth/login",
    SIGN_UP: URL + "auth/register",
    CHANGE_PASSWORD: URL + "users/password",
    USER_PROFILE: URL + "users/profile",
    UPLOAD_IMAGE: URL + "media/upload"
}

export default URL_ENUM;