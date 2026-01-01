import {api, requestConfig} from '../utils/config'

const getEquipments = async(user, limit, offset, filters = {}) => {
    //const user = JSON.parse(localStorage.getItem("user"))
    const config = requestConfig("GET", null, user.token)


    const params = {
        limit: Math.min(limit, 300), 
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
        
        console.table(res);

        return res;
    } catch (error) {
        console.log(error);
    }
}

const getEquipmentWithLoans = async( equipmentId) => {
    const config = requestConfig("GET", null)

    try{
        const res = await fetch(api + `/Equipment/${equipmentId}`, config)
            .then((res) => res.json())
            .catch((err) => err);

            console.log("getEquipment res: " + res);

            return res;
    }catch(error){
        console.log("getEquipment error: " + error)
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

const putEquipment = async(user, equipmentId, body) =>{
    const config = requestConfig("PUT", body, user.token)
    
    try {
        const res = await fetch(api + `/Equipment/${equipmentId}`, config)
        console.log("putEquipment res: " + res);

        return {success: true, status: 204}
    } catch (error) {
        console.log("putLoan error: " + error)
    }
}

const deleteEquipment = async(user, equipmentId) => {
    const config = requestConfig("DELETE", null, user.token)

    try{
        const res = await fetch(api + `/Equipment/${equipmentId}`, config)
            .then((res) => res.json())
            .catch((err) => err);

            console.log("deleteEquipment res: " + res);

            return res;
    }catch(error){
        console.log("deleteEquipment error: " + error)
    }
}

const updateStatus = async(user, equipmentStatus, body) => {
    const config = requestConfig("PUT", body, user.token)
    
    try{
        const res = await fetch(api + `/Equipment/updatestatus/${equipmentStatus}`, config)
            .then((res) => res.json())
            .catch((err) => err);

            return res;
    }catch(error){
        console.log("updatestatus error: " + error);
    }
}

const equipmentService = {
    getEquipments,
    getEquipmentWithLoans,
    postEquipment,
    putEquipment,
    deleteEquipment,
    updateStatus,
}

export default equipmentService;