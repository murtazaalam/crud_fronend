import axios from "axios";
import endpoints from "../routePath";

const signup = async (userData) => {
    const response = await axios.post(endpoints.SIGN_UP, userData);
    return response.data;
}

const login = async (userData) => {
    const response = await axios.post(endpoints.LOGIN, userData);
    if (response.status === 200) {
        localStorage.setItem("web_o_user", JSON.stringify(response.data))
        localStorage.setItem("web_o_token", response.data.token);
    }
    return response.data;
}

const changePassword = async (passwords) => {
    const response = await axios.put(endpoints.CHANGE_PASSWORD, passwords, {
        headers: {Authorization: localStorage.getItem("web_o_token")}
    });
    return response.data;
}

const authServices = {
    signup,
    login,
    changePassword
}

export default authServices;