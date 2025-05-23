import {api, requestConfig} from '../utils/config'

const getLoans = async(user, limit, offset, filters = {}) => {
    //const user = JSON.parse(localStorage.getItem("user"))
    const config = requestConfig("GET", null, user.token)

    const params = {
        limit: Math.min(limit, 30), 
        offset,
        ...filters
    }

    const queryString = Object.keys(params)
        .filter(key => params[key] != null && params[key] !== "")
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join("&");

    console.log(queryString)

    try {
        const res = await fetch(api + `/Loans?${queryString}`, config)
            .then((res) => res.json())
            .catch((err) => err);
        
        console.log("loan service res: " + res);

        return res;
    } catch (error) {
        console.log(error);
    }
}

const postLoan = async(user, body) => {
    const config = requestConfig("POST", body, user.token)
    console.log(config)
    try{
        const res = await fetch(api + "/Loans", config)
            .then((res) => res.json())
            .catch((err) => err);

            return res;
    }catch(error){
        console.log("postLoan error: " + error)
    }
}

const putLoan = async(user, loanId, body) =>{
    const config = requestConfig("PUT", body, user.token)
    
    try {
        const res = await fetch(api + `/Loans/${loanId}`, config)
        console.log("putLoan res: " + res);

        return {success: true, status: 204}
    } catch (error) {
        console.log("putLoan error: " + error)
    }
}

const deleteEquipmentFromLoan = async(user, equipmentId) =>{
    const config = requestConfig("PUT", null, user.token)
    
    try {
        const res = await fetch(api + `/Loans/deleteequipmentfromloan/${equipmentId}`, config)
        console.log("deleteEquipmentFromLoan res: ");
        console.dir(res)

        return res
    } catch (error) {
        console.log("deleteEquipmentFromLoan error: " + error)
    }
}

const deleteLoan = async(user, loanId) => {
    const config = requestConfig("DELETE", null, user.token)

    try{
        const res = await fetch(api + `/Loans/${loanId}`, config)
            /** .then((res) => res.json())
            .catch((err) => err)*/

            console.log("deleteLoan res: " + res);

            return res;
    }catch(error){
        console.log("deleteLoan error: " + error)
    }
}

const loanService = {
    getLoans,
    postLoan,
    putLoan,
    deleteEquipmentFromLoan,
    deleteLoan,
}

export default loanService;