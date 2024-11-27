import React, {useEffect} from 'react'
import styles from "./UserMenu.module.css"
import { NavLink, useNavigate } from 'react-router-dom'
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
        window.location.reload();
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
            <NavLink className={styles.userMenuLink} to="/"><li><span>UserName</span></li></NavLink>
            <NavLink className={styles.userMenuLink} to="/"><li><span>EditUser</span></li></NavLink>
            <NavLink className={styles.userMenuLink} to="/"><li><span>NewUser</span></li></NavLink>
            <div className={styles.userMenuLink} onClick={handleLogout}><li><span>Logout</span></li></div>
        </ul>
      </div>
    </div>
  )
}

export default UserMenu