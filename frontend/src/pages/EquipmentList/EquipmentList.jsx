import React, { useEffect, useState } from 'react'
import styles from "./EquipmentList.module.css"
import { FaPlus, FaFilter, FaHandshake, FaSearch } from "react-icons/fa";
import { useDispatch, useSelector} from "react-redux"
import { getEquipments } from '../../slices/equipmentSlice';
import {api, requestConfig} from '../../utils/config'
import { useAuth } from '../../hooks/useAuth'

const EquipmentList = () => {

  const {equipments, error, loading, success} = useSelector((state) => state.equipment);
  const { user } = useSelector((state) => state.auth) || {}
  const [searchQuery, setSearchQuery] = useState("Pesquisar");
  const dispatch = useDispatch();
  const {auth} = useAuth()
  

  useEffect(()=>{
    dispatch(getEquipments(user));
  }, [])

  console.log(equipments?equipments:"deu ruim: "+error)
  return (
    <div>
        <div className={styles.topListBar}>
          <div className={styles.searchBarContainer}>
            <input 
              type="search" 
              className={styles.searchBar} 
              value={searchQuery} 
              onFocus={(e) => setSearchQuery("")} 
              onChange={(e) => setSearchQuery(e.target.value) }
            />
          </div>
          <div className={styles.topListButtons}>
            <button className={styles.newItemButton}>
              <FaPlus/>
            </button>
            <button className={styles.filterButton}>
              <FaFilter/>
            </button>       
          </div>        
        </div>
        <div>
          <ul className={styles.items}>
            {equipments && equipments.map((equipment) => (
              <li key={equipment.equipmentId}>
                <div className={styles.equipmentBox}>
                  <h2>{equipment.equipmentName}</h2>
                  <p>{equipment.equipmentLoanStatus}</p>
                  <button>
                    <FaHandshake />
                  </button>
                  <button>
                    <FaSearch />
                  </button>
                </div>
              </li>
            ))}
          </ul>      
        </div>       
    </div>
  )
}

export default EquipmentList