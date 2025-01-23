import {api, requestConfig} from '../utils/config'

const getEquipments = async(user, limit, offset) => {
    //const user = JSON.parse(localStorage.getItem("user"))
    const config = requestConfig("GET", null, user.token)

    console.log(`/Equipment?limit=${limit}&offset=${offset}`)

    try {
        const res = await fetch(api + `/Equipment?limit=${Math.min(limit, 30)}&offset=${offset}`, config)
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

const equipmentService = {
    getEquipments,
    postEquipment,
}

export default equipmentService;