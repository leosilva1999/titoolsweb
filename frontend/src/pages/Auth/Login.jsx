import React, { useState } from 'react'
import { useFetch } from '../../hooks/useFetch';

import styles from "./Auth.module.css"
import { FaEnvelope, FaLock } from "react-icons/fa";


const url = "https://localhost:7280/api/Auth/login"

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {data, error, loading, fetchData} = useFetch(url, {});
  

  const handleLogin = async (e) => {
    e.preventDefault();

    const body = JSON.stringify({email, password});
    const headers = {"Content-Type": "application/json"};
    
    const jwtBearer = await fetchData({
      method: "POST",
      body,
      headers
    })
     console.log("cheguei aqui")
    console.info(jwtBearer);

  }

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
              <button type="submit" className={styles.loginBtn}>Entrar</button>
            </form>
            <a href="#" className={styles.forgotPassword}>Esqueci minha senha</a>
        </div>
    </div>
  )
}

export default Login