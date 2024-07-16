import React, { useState } from 'react'
import styles from "./Navbar.module.css"
import { NavLink } from 'react-router-dom'
import { FaBars, FaCog, FaUser } from "react-icons/fa";

//components
import Sidebar from '../Sidebar/Sidebar'

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);
  
  const showSidebar = () => {
    setSidebar(!sidebar)
    console.log("mostrando sidebar? "+sidebar)
  }

  return (
    <nav className={styles.navbar}>
        <div>
            <FaBars onClick={showSidebar} className={styles.menuIcon}/>
            {sidebar && <Sidebar active={setSidebar} />}
        </div>
        
        <NavLink className={styles.brand} to="/">
        <span>Aplac TI T<FaCog /><FaCog />ls</span>
            
        </NavLink>
        <div>
            <FaUser className={styles.userIcon} /><span className={styles.userName}>Leonardo</span>
        </div>
    </nav>
  )
}

export default Navbar