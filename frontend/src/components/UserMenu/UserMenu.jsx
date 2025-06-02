import React, {useEffect} from 'react'
import styles from "./UserMenu.module.css"
import { NavLink, useNavigate } from 'react-router-dom'
import { FaCog, FaSignOutAlt, FaUser, FaUsers } from "react-icons/fa";
import { useDispatch, useSelector} from "react-redux"
import { logout, reset } from '../../slices/authSlice';


const UserMenu = ({setOpenUserMenu}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {error, loading, success} = useSelector((state) => state.auth);
  

  const handleLogout = async (e) => {
    e.preventDefault();

    dispatch(logout());
    dispatch(reset());

    navigate("/login");
  }

  return (
    <div className={styles.background} onClick={() => setOpenUserMenu(false)}>
      <div className={styles.userMenu}>
        <div className={styles.container}>
          <ul className={styles.userMenuList}>
              <div className={styles.userMenuLink}><li><span>Profile</span><FaUser/></li></div>
              <NavLink className={styles.userMenuLink} to="/users"><li><span>Users</span><FaUsers/></li></NavLink>
              <div className={styles.userMenuLink}><li><span>Settings</span><FaCog/></li></div>
              <div className={styles.userMenuLinkLogout} onClick={handleLogout}><li>{loading?<span>Saindo...</span>:<span>Logout</span>}<FaSignOutAlt/></li></div>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default UserMenu