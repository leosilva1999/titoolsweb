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
        <div className='topListBar'>
          <div className='searchBar'>
            <input type="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value) }/>
          </div>
          <div className='topListButtons'>
            <FaPlus className={styles.newItemIcon}/>
            <FaFilter className={styles.filterIcon}/>
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