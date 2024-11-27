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

const logout = async(data, token) => {
    const config = requestConfig("POST", data, token)

    try{
        const res = await fetch(api + `/Auth/revoke/${data}`, config)
            .catch((err) => err);
            if(res.status == "204"){
                localStorage.clear()
                return res.status
            }else{
                return res;
            }
    }catch(error){
        console.log(error);
    }
   console.log("cheguei em logout")
}

const authService = {
    login,
    logout,
};

export default authService;