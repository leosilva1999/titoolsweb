export const api = "http://10.143.129.3:8080/api";
//export const api = "https://localhost:7280/api";


export const requestConfig = (method, data, token) => {

    let config

    if(method === "DELETE" || data === null){
        config = {
            method,
            headers: {}
        }
    }else{
        config = {
            method,
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }
    }
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }

    return config;
}
