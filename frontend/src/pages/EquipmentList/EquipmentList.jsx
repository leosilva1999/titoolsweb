import React, { useEffect, useState } from 'react'
import styles from "./EquipmentList.module.css"
import { FaPlus, FaFilter, FaHandshake, FaTrash, FaUndo } from "react-icons/fa";
import { useDispatch, useSelector} from "react-redux"
import { getEquipments } from '../../slices/equipmentSlice';
import {api, requestConfig} from '../../utils/config'
import { useAuth } from '../../hooks/useAuth'
import Modal from '../../components/Modal/Modal';
import AddEquipment from '../../components/AddEquipment/AddEquipment';

const EquipmentList = () => {

  const {equipments, error, loading, success} = useSelector((state) => state.equipment);
  const { user } = useSelector((state) => state.auth) || {}
  const [searchQuery, setSearchQuery] = useState("Pesquisar");
  const dispatch = useDispatch();
  const {auth} = useAuth()

  const [modalOpen, setModalOpen] = useState(false);
  

  useEffect(()=>{
    dispatch(getEquipments(user));
  }, [])

  console.log(equipments?equipments:"deu ruim: "+error)
  return (
    <div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <AddEquipment />
      </Modal>
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
            <button className={styles.newItemButton} onClick={() => setModalOpen(!modalOpen)}>
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
                  {equipment.equipmentLoanStatus ? 
                    <p style={{color: "red", fontWeight: "bold"}}>Emprestado</p>
                    :
                    <p style={{color: "green", fontWeight: "bold"}}>Disponível</p>
                  }
                  <div className={styles.itemButtonContainer}>
                  {equipment.equipmentLoanStatus ? 
                      <button title="Devolver" className={styles.undoLoanItemButton}>
                        <FaUndo />
                      </button>
                    :
                      <button title="Emprestar" className={styles.loanItemButton}>
                        <FaHandshake />
                      </button>
                  }                   
                    <button title="Remover" className={styles.deleteItemButton}>
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>      
        </div>       
    </div>
  )
}

export default EquipmentList