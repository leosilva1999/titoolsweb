import React, { useState, useEffect } from 'react'
import styles from "./Navbar.module.css"
import { NavLink } from 'react-router-dom'
import { FaBars, FaCog, FaUser } from "react-icons/fa";

//components
import Sidebar from '../Sidebar/Sidebar'
import UserMenu from '../UserMenu/UserMenu';
import { useAuth } from '../../hooks/useAuth';
import { useSelector } from "react-redux";
import {jwtDecode} from 'jwt-decode';

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const {auth} = useAuth()
  const { user } = useSelector((state) => state.auth) || null;
  const { id } = user && user.token?jwtDecode(user.token):{id: null};
  
  const showSidebar = () => {
    setSidebar(!sidebar)
    console.log("mostrando sidebar? "+sidebar)
  }

  return (
    auth? 
      <nav className={styles.navbar}>
        <div>
            <FaBars onClick={showSidebar} className={styles.menuIcon}/>
            {sidebar && <Sidebar active={setSidebar} />}
        </div>
        
        <NavLink className={styles.brand} to="/">
        <span>Aplac TI T<FaCog /><FaCog />ls</span>
            
        </NavLink>
        <div className={styles.userNameContainer} onClick={() => setOpenUserMenu((prev) => !prev)}>
            <span className={styles.userName}>{id?id:"Fazer Login"}</span><FaUser className={styles.userIcon} />
        </div>
        {
          openUserMenu && <UserMenu />          
        }         
      </nav> 
    : ''  
  )
}

export default Navbar