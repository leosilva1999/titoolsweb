import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {jwtDecode} from 'jwt-decode';

export const useAuth = () => {
    const { user } = useSelector((state) => state.auth);

    const [auth, setAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if(user){
        const { exp } = jwtDecode(user.token);
        const currentTime = Math.floor(Date.now() / 1000);
        setAuth(exp > currentTime)
      }else{
        setAuth(false)
      }

      setLoading(false)
    }, [user])

    return {auth, loading}
}