import React from 'react'
import styles from "./Sidebar.module.css"
import {FaTimes, FaBullhorn, FaLaptop, FaHome, FaHandshake, FaWikipediaW, FaExternalLinkAlt}  from "react-icons/fa";
import { NavLink } from 'react-router-dom'

const Sidebar = ({ active }) => {

    const closeSidebar = () => {
        active(false)
    }

  return (
    <div className={styles.background} onClick={closeSidebar}>    
        <div className={styles.sidebar}>
            <FaTimes onClick={closeSidebar} className={styles.timesIcon} />
            <div className={styles.container}>
                <nav>
                    <ul>
                        <NavLink className={styles.navlink} to="/"><li><FaHome /><span>Home</span></li></NavLink>
                        <NavLink className={styles.navlink} to="/equipmentlist"><li><FaLaptop /><span>Controle de equipamentos</span></li></NavLink>
                        <NavLink className={styles.navlink} to="/"><li><FaBullhorn /><span>Atendimentos</span></li></NavLink>
                        <NavLink className={styles.navlink} to="/loanlist"><li><FaHandshake /><span>Empréstimos</span></li></NavLink>
                        <a href="https://wiki.aplac.org.br" target="_blank" className={styles.navlink}><li><FaWikipediaW /><span>Wiki <FaExternalLinkAlt/></span></li></a>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
  )
}

export default Sidebar