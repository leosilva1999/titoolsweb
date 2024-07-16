import React from 'react'
import styles from "./Sidebar.module.css"
import {FaTimes, FaBullhorn, FaLaptop}  from "react-icons/fa";
import { NavLink } from 'react-router-dom'

const Sidebar = ({ active }) => {

    const closeSidebar = () => {
        active(false)
    }

  return (
    <div className={styles.sidebar}>
        <FaTimes onClick={closeSidebar} className={styles.timesIcon} />
        <div className={styles.container}>
            <nav>
                <ul>
                    <NavLink className={styles.navlink} to="/equipmentlist"><li><FaLaptop /><span>Controle de equipamentos</span></li></NavLink>
                    <NavLink className={styles.navlink} to="/"><li><FaBullhorn /><span>Atendimentos</span></li></NavLink>
                </ul>
            </nav>
        </div>
    </div>
  )
}

export default Sidebar