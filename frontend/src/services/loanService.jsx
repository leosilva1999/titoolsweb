import {api, requestConfig} from '../utils/config'

const getLoans = async(user, limit, offset) => {
    //const user = JSON.parse(localStorage.getItem("user"))
    const config = requestConfig("GET", null, user.token)

    console.log(`/Loan?limit=${limit}&offset=${offset}`)

    try {
        const res = await fetch(api + `/Loan?limit=${Math.min(limit, 30)}&offset=${offset}`, config)
            .then((res) => res.json())
            .catch((err) => err);
        
        console.log("loan service res: " + res);

        return res;
    } catch (error) {
        console.log(error);
    }
}