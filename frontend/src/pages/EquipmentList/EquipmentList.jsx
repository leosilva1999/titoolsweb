import React, { useState } from 'react'
import styles from "./EquipmentList.module.css"
import { useFetch } from '../../hooks/useFetch';
import { FaPlus, FaFilter, FaHandshake, FaSearch } from "react-icons/fa";


const url = "http://localhost:3000/equipment"

const EquipmentList = () => {
  const [searchQuery, setSearchQuery] = useState("Pesquisar");
  const {data: equipments} = useFetch(url);
  
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
              <li key={equipment.id}>
                <div className={styles.equipmentBox}>
                  <h2>{equipment.name}</h2>
                  <p>{equipment.status}</p>
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