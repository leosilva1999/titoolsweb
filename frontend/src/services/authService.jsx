import { api, requestConfig } from '../utils/config'

// sign in an user

const login = async (data) => {
    const config = requestConfig("POST", data)

    try {

        const res = await fetch(api + "/Auth/login", config)
            .then((res) => res.json())
            .catch((err) => err);

        if (res) {
            const { token, expiration, refreshToken } = res;
            localStorage.setItem("user", JSON.stringify({ token: token, expiration: expiration }));
            sessionStorage.setItem("refreshToken", refreshToken);
            return res;
        }
    } catch (error) {
        console.log(error);
    }
}

//create an user

const createUser = async (body) => {
    const config = requestConfig("POST", body.user)

    try {

        const res = await fetch(api + "/Auth/register", config)
            .then((res) => res.json())
            .catch((err) => err);

        if (res) {
            return res;
        }
    } catch (error) {
        console.log("createUser error: " + error);
    }
}

// sign out an user

const logout = async () => {
    try {
        localStorage.removeItem("user");
        return
    } catch (error) {
        return error.message;
    }
}

const refreshToken = async (data) => {
    const config = requestConfig("POST", data)

    try {
        const res = await fetch(api + "/Auth/refresh-token", config)
            .then((res) => res.json())
            .catch((err) => err);

        const { acessToken, refreshToken } = res;
        localStorage.setItem("user", { "token": accessToken });
        sessionStorage.setItem("refreshToken", refreshToken);

        return res;
    } catch (error) {
        return error.message;
    }
}

const getUsers = async (user, limit, offset, filters = {}) => {
    const config = requestConfig("GET", null, user.token)

    const params = {
        limit: Math.min(limit, 300), 
        offset,
        ...filters
    }

    const queryString = Object.keys(params)
    .filter(key => params[key] != null && params[key] !== "")
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join("&");

console.log(queryString)

    try {
        const res = await fetch(api + `/Auth?${queryString}`, config)
            .then((res) => res.json())
            .catch((err) => err);


        return res;
    } catch (error) {
        console.log(error);
    }

    console.table(res.response);
    
    return res;
}

const addUserToRole = async (user, body) => {
    const config = requestConfig("POST", null, user.token)
    
    const res = await fetch(api + `/Auth/AddUserToRole?email=${body.email}&rolename=${body.roleName}`, config)
    .then((res) => res.json())
    .catch((err) => err);
    
    return res;
}

const removeUserFromRole = async(user, email, rolename) => {
    const config = requestConfig("DELETE", null, user.token)

    const res = await fetch(api + `/Auth/RemoveUserFromRole?email=${email}}&rolename=${rolename}`, config)
    .then((res) => res.json())
    .catch((err) => err);

    return res;
}
const removeUserFromAllRoles = async(user, email) => {
    const config = requestConfig("DELETE", null, user.token)

    const res = await fetch(api + `/Auth/RemoveUserFromAllRoles?email=${email}}`, config)
    .then((res) => res.json())
    .catch((err) => err);

    return res;
}

const deleteUser = async(user, email) => {
    const config = requestConfig("DELETE", null, user.token)

    const res = await fetch(api + `/Auth/DeleteUser?email=${email}`, config)
    .then((res) => res.json())
    .catch((err) => err);

    return res;
}

const authService = {
    login,
    logout,
    refreshToken,
    createUser,
    getUsers,
    addUserToRole,
    removeUserFromRole,
    removeUserFromAllRoles,
    deleteUser
};

export default authService;