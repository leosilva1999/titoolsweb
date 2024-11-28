import React, {useEffect} from 'react'
import styles from "./UserMenu.module.css"
import { NavLink, useNavigate } from 'react-router-dom'
import { FaCog, FaSignOutAlt, FaUser, FaUsers } from "react-icons/fa";
import { useDispatch, useSelector} from "react-redux"
import { logout, reset } from '../../slices/authSlice';


const UserMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {error, loading, success} = useSelector((state) => state.auth);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = async (e) => {
    e.preventDefault();

    dispatch(logout(user))
  }

    // login page if success is true
     useEffect(() => {
      if(success){
        navigate("/login");
      }
    }, [success, navigate])
  
    // clean auth states
   useEffect(() => {
      dispatch(reset())
    }, [dispatch]);
  return (
    <div className={styles.userMenu}>
      <div className={styles.container}>
        <ul className={styles.userMenuList}>
            <div className={styles.userMenuLink}><li><span>Profile</span><FaUser/></li></div>
            <div className={styles.userMenuLink}><li><span>Users</span><FaUsers/></li></div>
            <div className={styles.userMenuLink}><li><span>Settings</span><FaCog/></li></div>
            <div className={styles.userMenuLink} onClick={handleLogout}><li>{loading?<span>Saindo...</span>:<span>Logout</span>}<FaSignOutAlt/></li></div>
        </ul>
      </div>
    </div>
  )
}

export default UserMenu