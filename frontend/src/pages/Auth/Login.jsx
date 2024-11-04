import React from 'react'
import styles from "./Auth.module.css"
import { FaEnvelope, FaLock } from "react-icons/fa";

const Login = () => {
  return (
    <div id="login-page">
        <div className={styles.loginContainer}>
          <div className={styles.brand}>
            <div className={styles.brandTextTop}><h2>APlac TI</h2></div>
            <div className={styles.brandTextBottom}><h2>Tools</h2></div>
          </div>
            <form>
              <div className={styles.inputBox}>
                <input type='text' placeholder='E-mail'/>
                <FaEnvelope className={styles.faenvelope}/>
              </div>
              <div className={styles.inputBox}>
                <input type="password" placeholder='Senha' />
                <FaLock className={styles.falock}/>
              </div>
              <button className={styles.loginBtn}>Entrar</button>
            </form>
            <a href="#" classname={styles.forgotPassword}>Esqueci minha senha</a>
        </div>
    </div>
  )
}

export default Login