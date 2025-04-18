import React, { useEffect, useState, useRef } from 'react'
import styles from "./EquipmentList.module.css"
import { FaPlus, FaFilter, FaHandshake, FaTrash, FaUndo, FaLaptop, FaFilePdf, FaTable } from "react-icons/fa";
import { BlobProvider } from '@react-pdf/renderer';
import { useDispatch, useSelector } from "react-redux"
import { getEquipments } from '../../slices/equipmentSlice';
import Modal from '../../components/Modal/Modal';
import AddEquipment from '../../components/AddEquipment/AddEquipment';
import Pagination from '../../components/Pagination/Pagination';
import DeleteEquipment from '../../components/DeleteEquipment/DeleteEquipment';
import AddLoan from '../../components/AddLoan/AddLoan';
import EquipmentsQueryFilter from '../../QueryFilter/EquipmentsQueryFilter/EquipmentsQueryFilter';
import EquipmentsReport from '../../reports/equipmentsReport';

const EquipmentList =
  () => {

    const { equipments, equipmentCount, error, loading, success } = useSelector((state) => state.equipment);
    const { user } = useSelector((state) => state.auth) || {}
    const dispatch = useDispatch();

    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);

    const [filters, setFilters] = useState({
      equipmentName: "",
      macAddress: "",
      equipmentLoanStatus: "",
    });

    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [openQueryFilter, setOpenQueryFilter] = useState(false);
    const isDownloading = useRef(false);
    const [reportType, setReportType] = useState(null);
    const [reportState, setReportState] = useState({
      generating: false,
      downloaded: false,
    })

    const handleShowComponent = (componentName, data = null) => {
      componentName === "AddEquipment" ? setModalContent(<AddEquipment />) : null;
      componentName === "DeleteEquipment" ? setModalContent(<DeleteEquipment data={data} setModalOpen={setModalOpen} />) : null;
      componentName === "AddLoan" ? setModalContent(<AddLoan data={data} setModalOpen={setModalOpen} />) : null;
    };

    const handleDownloadPdf = () => {
      setReportState({
        generating: true,
        downloaded: false
      })
      isDownloading.current = false;
    }

    useEffect(() => {
      dispatch(getEquipments({ user, limit, offset, filters }));
    }, [])

    useEffect(() => {
      dispatch(getEquipments({ user, limit, offset, filters }));
    }, [limit, offset, filters])

    console.log(equipments ? equipments : "deu ruim: " + error)
    return (

      <div>
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          {modalContent}
        </Modal>
        <div className={styles.equipmentsHeader}>
          <label><FaLaptop /></label>
          <h2>Equipamentos</h2>
        </div>
        <div className={styles.equipmentsContainer}>
          <div className={styles.topListBar}>
            <div className={styles.topListButtons}>
              <button className={styles.newItemButton} onClick={() => {
                setModalOpen(!modalOpen);
                handleShowComponent("AddEquipment");
              }}>
                <FaPlus />
              </button>
              <button className={styles.filterButton} onClick={() => setOpenQueryFilter((prev) => !prev)}>
                <FaFilter />
              </button>
              <button className={styles.filterButton} onClick={() => {
                handleDownloadPdf();
                setReportType("PDF")
                }}>
                <FaFilePdf />
              </button>
              <button className={styles.filterButton} onClick={() => setOpenQueryFilter((prev) => !prev)}>
                <FaTable />
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
                      <p style={{ color: "red", fontWeight: "bold" }}>Emprestado</p>
                      :
                      <p style={{ color: "green", fontWeight: "bold" }}>Disponível</p>
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
        {
          openQueryFilter && <EquipmentsQueryFilter setOpenQueryFilter={setOpenQueryFilter} setFilters={setFilters} filtersInPage={filters} />
        }
        {
          reportState.generating && !reportState.downloaded && (<BlobProvider
          document={<EquipmentsReport data={equipments} reportType={reportType} />}
        >
          {({blob, loading}) => {
            if(blob && !loading && !isDownloading.current){
              isDownloading.current = true
              const link = document.createElement("a");
              link.href = URL.createObjectURL(blob);
              if(reportType == "PDF"){
                link.download = 'equipamentos.pdf';
              }else if(reportType == "XLSX"){
                link.download = 'equipamentos.xlsx';
              }
              link.style.display = 'none';

              link.onclick = ()=>{
                setTimeout(() => {
                  document.body.removeChild(link);
                  URL.revokeObjectURL(link.href)
                  setReportState({
                    generating: false,
                    downloaded: true
                  }, 100);
                });
              };
              
              document.body.appendChild(link);
              link.click();
            }
            return null
          }}
        </BlobProvider>
        )}
      </div>
    )
  }

export default EquipmentList