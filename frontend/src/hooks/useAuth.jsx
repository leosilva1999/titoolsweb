import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
//import {refreshtoken} from "../slices/authSlice";

import {jwtDecode} from 'jwt-decode';

export const useAuth = () => {
    const { user, refreshToken, success } = useSelector((state) => state.auth) || {};

    const [auth, setAuth] = useState(false);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    /*const handleRefreshToken = () => {
      dispatch(refreshtoken(
        {
          accessToken: user.token, 
          refreshToken: refreshToken
        }
      ));
    }*/

    useEffect(() => {
      
      if(user /*&& refreshToken*/){
        try {
          const { exp } = jwtDecode(user.token);
          const currentTime = Math.floor(Date.now() / 1000);
          if(exp > currentTime){
            setAuth(true)
          }else{
            //handleRefreshToken()
            setAuth(false)
          }
        } catch (error) {
          console.log("erro ao verificar token: " + error.message);
        }  
      }else{
        setAuth(false)
      }

      setLoading(false)
    }, [user])

    return {auth, loading}
}