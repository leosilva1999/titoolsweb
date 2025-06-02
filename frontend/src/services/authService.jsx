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

const createUser = async (data) => {
    const config = requestConfig("POST", data)

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

const getUsers = async (user, limit, offset) => {
    const config = requestConfig("GET", null, user.token)

    const res = await fetch(api + `/Auth?limit=${limit}&offset=${offset}`, config)
        .then((res) => res.json())
        .catch((err) => err);;

    console.table(res.response);
    
    return res;
}

const authService = {
    login,
    logout,
    refreshToken,
    createUser,
    getUsers
};

export default authService;