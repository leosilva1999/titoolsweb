import {useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";

export const useJwt = () => {
    const [userName, setUserName] = useState(null);
    const [userEmail, setuserEmail] = useState(null);
    const [userRoles, setuserRoles] = useState(null);
    
    const jwt = JSON.parse(localStorage.getItem("user"));
    if(!jwt) return "User not found";

    /*useEffect(()=>{
        try{
            const decoded = jwtDecode(jwt.token);
            setUserName(decoded.unique_name);
            setuserEmail(decoded.email);
            setuserRoles(decoded.role);
        }catch(err){
            console.log("Token inválido: " + err.message);
            return err.message;
        }
    }, [jwt])*/

    return {userName, userEmail, userRoles}
}