import {api, requestConfig} from '../utils/config'

// sign in an user

const login = async(data) => {
    const config = requestConfig("POST", data)

    try {
        
        const res = await fetch(api + "/Auth/login", config)
            .then((res) => res.json())
            .catch((err) => err);
        
        if(res){
            localStorage.setItem("user", JSON.stringify(res));
            return res;
        }
    } catch (error) {
        console.log(error);
    }
}

const logout = async() => {
    try {
        localStorage.removeItem("user");
        return
    } catch (error) {
        return error.message;
    }
}

const authService = {
    login,
    logout,
};

export default authService;