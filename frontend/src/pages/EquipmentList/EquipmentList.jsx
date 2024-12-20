import React, { useEffect, useState } from 'react'
import styles from "./EquipmentList.module.css"
import { FaPlus, FaFilter, FaHandshake, FaSearch } from "react-icons/fa";
import { useDispatch, useSelector} from "react-redux"
import { getEquipments } from '../../slices/equipmentSlice';
import {api, requestConfig} from '../../utils/config'

const EquipmentList = () => {

  const {equipments, error, loading, success} = useSelector((state) => state.equipment);
  const [searchQuery, setSearchQuery] = useState("Pesquisar");
  const dispatch = useDispatch();
  //const user = JSON.parse(localStorage.getItem("user"))
  //const config = requestConfig("GET", null, user?.token)

  useEffect(()=>{
    dispatch(getEquipments());
  }, [])

  /*useEffect(() => {
   const fetchEquipments = async () => {
    try {
      const res = await fetch(api + "/Equipment", config);
      if(!res.ok){
        throw new Error("Failed to fetch equipments!");
      }

      const data = await res.json();

      setEquipments(data);
    } catch (error) {
      console.log("error: " + error.message)
    }
   }

   fetchEquipments();
   console.log(equipments)
  }, [])*/
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