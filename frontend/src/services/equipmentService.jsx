import {api, requestConfig} from '../utils/config'

const getEquipments = async(user, limit, offset, filters = {}) => {
    //const user = JSON.parse(localStorage.getItem("user"))
    const config = requestConfig("GET", null, user.token)


    const params = {
        limit: Math.min(limit, 30), 
        offset,
        ...filters
    }

    console.log(`/Equipment?limit=${limit}&offset=${offset}`)

    const queryString = Object.keys(params)
    .filter(key => params[key] != null && params[key] !== "")
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join("&");

console.log(queryString)

    try {
        const res = await fetch(api + `/Equipment?${queryString}`, config)
            .then((res) => res.json())
            .catch((err) => err);
        
        console.log("equipment service res: " + res);

        return res;
    } catch (error) {
        console.log(error);
    }
}

const postEquipment = async(user, body) => {
    const config = requestConfig("POST", body, user.token)
    try{
        const res = await fetch(api + "/Equipment", config)
            .then((res) => res.json())
            .catch((err) => err);

            console.log("postEquipment res: " + res);

            return res;
    }catch(error){
        console.log("postEquipment error: " + error)
    }
}

const deleteEquipment = async(user, equipmentId) => {
    const config = requestConfig("DELETE", null, user.token)

    try{
        const res = await fetch(api + `/Equipment/${equipmentId}`, config)
            .then((res) => res.json())
            .catch((err) => err)

            console.log("deleteEquipment res: " + res);

            return res;
    }catch(error){
        console.log("deleteEquipment error: " + error)
    }
}

const equipmentService = {
    getEquipments,
    postEquipment,
    deleteEquipment,
}

export default equipmentService;