import React, { useEffect, useState } from 'react'
import styles from "./EquipmentList.module.css"
import Select from "react-select"
import { FaPlus, FaFilter, FaHandshake, FaTrash, FaUndo } from "react-icons/fa";
import { useDispatch, useSelector} from "react-redux"
import { getEquipments } from '../../slices/equipmentSlice';
import Modal from '../../components/Modal/Modal';
import AddEquipment from '../../components/AddEquipment/AddEquipment';
import Pagination from '../../components/Pagination/Pagination';
import DeleteEquipment from '../../components/DeleteEquipment/DeleteEquipment';
import AddLoan from '../../components/AddLoan/AddLoan';

const EquipmentList = () => {

  const {equipments, equipmentCount, error, loading, success} = useSelector((state) => state.equipment);
  const { user } = useSelector((state) => state.auth) || {}
  const [searchQuery, setSearchQuery] = useState("Pesquisar");
  const dispatch = useDispatch();

  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const handleShowComponent = (componentName, data=null) => {
    componentName === "AddEquipment" ? setModalContent(<AddEquipment />) : null;
    componentName === "DeleteEquipment" ? setModalContent(<DeleteEquipment data={data}/>) : null;
    componentName === "AddLoan" ? setModalContent(<AddLoan data={data}/>) : null;
  };
  

  useEffect(()=>{
    dispatch(getEquipments({user, limit, offset}));
  }, [])

  useEffect(()=>{
    dispatch(getEquipments({user, limit, offset}));
  }, [limit, offset])

  console.log(equipments?equipments:"deu ruim: "+error)
  return (
    <div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        {modalContent}
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
            <button className={styles.newItemButton} onClick={() => {
              setModalOpen(!modalOpen); 
              handleShowComponent("AddEquipment");
            }}>
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
                      <button title="Emprestar" className={styles.loanItemButton} onClick={() => {
                        setModalOpen(!modalOpen); 
                        handleShowComponent("AddLoan", equipment.equipmentId);
                      }}>
                        <FaHandshake />
                      </button>
                  }                   
                    <button title="Remover" className={styles.deleteItemButton} onClick={() => {
                      setModalOpen(!modalOpen); 
                      handleShowComponent("DeleteEquipment", equipment.equipmentId);
                    }}>
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <Pagination registerCount={equipmentCount} limit={limit} setLimit={setLimit} offset={offset} setOffset={setOffset} />      
        </div>       
    </div>
  )
}

export default EquipmentList