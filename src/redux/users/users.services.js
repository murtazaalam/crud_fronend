import axios from "axios";
import endpoints from "../routePath";

const getUsers = async (params) => {
    const {page, size, sort_on, sort_by} = params;
    const response = await axios.get(endpoints.USERS, {
        params: { page, size, sort_on, sort_by },
        headers: {Authorization: localStorage.getItem("web_o_token")}
    });
    return response.data;
}

const updateUser = async (params) => {
    const response = await axios.put(endpoints.USER_PROFILE, params, {
        headers: {Authorization: localStorage.getItem("web_o_token")}
    });
    return response.data;
}

const deleteUser = async (params) => {
    const response = await axios.delete(endpoints.USER_PROFILE, {
        headers: {Authorization: localStorage.getItem("web_o_token")}
    });
    return response.data;
}

const usersServices = {
    getUsers,
    deleteUser,
    updateUser
}

export default usersServices;