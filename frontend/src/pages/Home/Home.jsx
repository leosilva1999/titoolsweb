import React from 'react'
import styles from './Home.module.css'
import aplacLogo from '../../assets/aplacLogo.png'
const Home = () => {
  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.homeTitle}>Seja bem-vindo!</h1>
      </div>
      <div className={styles.logoContainer}>
        <img src={aplacLogo} alt="logo" style={{width: "40vw"}} />
      </div>
    </div>
  )
}

export default Home