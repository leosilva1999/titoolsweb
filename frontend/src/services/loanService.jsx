import {api, requestConfig} from '../utils/config'

const getLoans = async(user, limit, offset) => {
    //const user = JSON.parse(localStorage.getItem("user"))
    const config = requestConfig("GET", null, user.token)

    console.log(`/Loan?limit=${limit}&offset=${offset}`)

    try {
        const res = await fetch(api + `/Loans?limit=${Math.min(limit, 30)}&offset=${offset}`, config)
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

const deleteLoan = async(user, loanId) => {
    const config = requestConfig("DELETE", null, user.token)

    try{
        const res = await fetch(api + `/Equipment/${loanId}`, config)
            .then((res) => res.json())
            .catch((err) => err)

            console.log("deleteLoan res: " + res);

            return res;
    }catch(error){
        console.log("deleteLoan error: " + error)
    }
}

const loanService = {
    getLoans,
    postLoan,
    deleteLoan,
}

export default loanService;