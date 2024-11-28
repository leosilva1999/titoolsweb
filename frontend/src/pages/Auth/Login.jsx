import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from "./Auth.module.css"
import { FaEnvelope, FaLock } from "react-icons/fa";

//redux
import {login, reset} from "../../slices/authSlice";
import {useSelector, useDispatch} from "react-redux"


//const url = "https://localhost:7280/api/Auth/login"

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {error, loading, success} = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const handleLogin = async (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    dispatch(login(user))
  }

  // homepage if success is true
  useEffect(() => {
    if(success){
      navigate("/");
    }
  }, [success, navigate])

  // clean auth states
 useEffect(() => {
    dispatch(reset())
  }, [dispatch]);

  return (
    <div id="login-page">
        <div className={styles.loginContainer}>
          <div className={styles.brand}>
            <div className={styles.brandTextTop}><h2>APlac TI</h2></div>
            <div className={styles.brandTextBottom}><h2>Tools</h2></div>
          </div>
            <form onSubmit={handleLogin}>
              <div className={styles.inputBox}>
                <input 
                  type='email' 
                  value={email} 
                  placeholder='E-mail' 
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
                <FaEnvelope className={styles.faenvelope}/>
              </div>
              <div className={styles.inputBox}>
                <input 
                  type="password"
                  value={password} 
                  placeholder='Senha'
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
                <FaLock className={styles.falock}/>
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className={styles.loginBtn}
              >
                {loading ? "Entrando..." : "Entrar"}
              </button>
            </form>
            {error && <p style={{color: "red"}}>{error}</p>}
            <a href="#" className={styles.forgotPassword}>Esqueci minha senha</a>
        </div>
    </div>
  )
}

export default Login