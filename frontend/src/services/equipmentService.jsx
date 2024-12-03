import { generatePath } from 'react-router-dom';
import {api, requestConfig} from '../utils/config'

const getEquipments = async() => {
    const config = requestConfig("POST")

    try {
        const res = await fetch(api + "/Equipment", config)
            .then((res) => res.json())
            .catch((err) => err);
        
            return res;
        
    } catch (error) {
        console.log(error);
        return ("erro: "+ error.message)
    }
}

const equipmentService = {
    getEquipments,
}

export default equipmentService;