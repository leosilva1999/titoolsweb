import React from 'react'
import styles from './Layout.module.css'
import { Outlet } from 'react-router-dom'
import "../App.css"

const Layout = () => {
  return (
    <div className={styles.appContainer}>
        <main className="content">
            <Outlet />
        </main>

        <footer className="footer">
            <p className={styles.footerText}>Colégio Adventista de Planaltina &copy; 2024</p>
        </footer>
    </div>
  )
}

export default Layout