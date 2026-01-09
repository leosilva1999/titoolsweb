import React, { useEffect, useState, useRef } from 'react'
import styles from "./EquipmentList.module.css"

import { FaPlus, FaFilter, FaHandshake, FaTrash, FaUndo, FaLaptop, FaFilePdf, FaTable, FaTags, FaListUl } from "react-icons/fa";
import { BlobProvider } from '@react-pdf/renderer';
import { useDispatch, useSelector } from "react-redux"

import { getEquipments } from '../../slices/equipmentSlice';
import Modal from '../../components/Modal/Modal';
import AddEquipment from '../../components/AddEquipment/AddEquipment';
import Pagination from '../../components/Pagination/Pagination';
import DeleteEquipment from '../../components/DeleteEquipment/DeleteEquipment';
import UpdateEquipment from '../../components/UpdateEquipment/UpdateEquipment';
import ReleaseEquipment from '../../components/ReleaseEquipment/ReleaseEquipment';
import GenerateEquipmentReport from '../../components/GenerateEquipmentReport/GenerateEquipmentReport';
import AddLoan from '../../components/AddLoan/AddLoan';
import EquipmentsQueryFilter from '../../QueryFilter/EquipmentsQueryFilter/EquipmentsQueryFilter';
import EquipmentsReport from '../../reports/equipmentsReport';
import GenerateLabels from '../../components/GenerateLabels/GenerateLabels';

const EquipmentList =
  () => {

    const { equipments, equipmentCount} = useSelector((state) => state.equipment);
    const { user } = useSelector((state) => state.auth) || {}
    const dispatch = useDispatch();

    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);

    const [filters, setFilters] = useState({
      equipmentName: "",
      macAddress: "",
      type: "",
      manufacturer: "",
      model: "",
      equipmentLoanStatus: "",
    });


    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [openQueryFilter, setOpenQueryFilter] = useState(false);
    const isDownloading = useRef(false);
    const [reportState, setReportState] = useState({
      generating: false,
      downloaded: false,
    })

    const handleShowComponent = (componentName, data = null) => {
      componentName === "AddEquipment" ? setModalContent(<AddEquipment data={data} />) : null;
      componentName === "UpdateEquipment" ? setModalContent(<UpdateEquipment selectedEquipment={data} setModalOpen={setModalOpen} />) : null;
      componentName === "DeleteEquipment" ? setModalContent(<DeleteEquipment data={data} setModalOpen={setModalOpen} />) : null;
      componentName === "GenerateEquipmentReport" ? setModalContent(<GenerateEquipmentReport data={data} setModalOpen={setModalOpen} />) : null;
      componentName === "ReleaseEquipment" ? setModalContent(<ReleaseEquipment data={data} />) : null;
      componentName === "GenerateLabels" ? setModalContent(<GenerateLabels data={data} />) : null;
    };

    useEffect(() => {
      dispatch(getEquipments({ user, limit, offset, filters }));
    }, [])

    useEffect(() => {
      dispatch(getEquipments({ user, limit, offset, filters }));
    }, [limit, offset, filters])



    const dataToReports = equipments && equipments.map(equip => ({
      ID: equip.equipmentId,
      Nome: equip.equipmentName,
      IP: equip.ipAddress,
      MAC: equip.macAddress,
      Tipo: equip.type,
      Fabricante: equip.manufacturer,
      Modelo: equip.model,
      Status: equip.equipmentLoanStatus ? "Emprestado" : "Disponível"
    }))

    const handleDownloadPdf = () => {
      setReportState({
        generating: true,
        downloaded: false
      })
      isDownloading.current = false;
    }


    return (

      <div>
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          {modalContent}
        </Modal>
        <div className={styles.equipmentsHeader}>
          <div className={styles.headerIcon}>
            <label><FaLaptop /></label>
          </div>
          <h2>Equipamentos</h2>
        </div>
        <div className={styles.equipmentsContainer}>
          <div className={styles.topListBar}>
            <div className={styles.topListButtons}>
              <button title="Novo Equipamento" className={styles.newItemButton} onClick={() => {
                setModalOpen(!modalOpen);
                handleShowComponent("AddEquipment");
              }}>
                <FaPlus />
              </button>
              <p className={styles.pipe}>|</p>
              <button title="Exportar PDF" className={styles.exportButton} onClick={() => {
                        setModalOpen(!modalOpen);
                        handleShowComponent("GenerateEquipmentReport", {typeOfReport: "pdf", entity: "Equipment", filters})
                      }}>
                <FaFilePdf />
              </button>
              <button title="Exportar para Excel" className={styles.exportButton} onClick={() => {
                        setModalOpen(!modalOpen);
                        handleShowComponent("GenerateEquipmentReport", {typeOfReport: "xlsx", entity: "Equipment", filters})
                      }}>
                <FaTable />
              </button>
              <button title="Gerar etiquetas" className={styles.exportButton} onClick={() => {
                        setModalOpen(!modalOpen);
                        handleShowComponent("GenerateLabels", {filters})
                      }}>
                <FaTags />
              </button>
              <p className={styles.pipe}>|</p>
              <button title="Filtrar" className={styles.filterButton} onClick={() => setOpenQueryFilter((prev) => !prev)}>
                <FaFilter />
              </button>
            </div>
          </div>
          <div>
            <ul className={styles.items}>
              {equipments && equipments.map((equipment) => (
                <li key={equipment.equipmentId}>
                  <div className={styles.equipmentBox}>
                    <h2>{equipment.equipmentName}</h2>
                    <p>{equipment.type}</p>
                    <p>{equipment.manufacturer} {equipment.model}</p>
                    {equipment.equipmentLoanStatus ?
                      <p style={{ color: "red", fontWeight: "bold" }}>Emprestado</p>
                      :
                      <p style={{ color: "green", fontWeight: "bold" }}>Disponível</p>
                    }
                    <div className={styles.itemButtonContainer}>
                      <button title="Detalhes" className={styles.editEquipmentButton} onClick={() => {
                        setModalOpen(!modalOpen);
                        handleShowComponent("UpdateEquipment", equipment)
                      }}><FaListUl /></button>
                      {equipment.equipmentLoanStatus ?
                        <button title="Devolver" className={styles.undoLoanItemButton} onClick={() => {
                          setModalOpen(!modalOpen);
                          handleShowComponent("ReleaseEquipment", equipment.equipmentId)
                        }}>
                          <FaUndo />
                        </button>
                        :
                        <button title="Emprestar" className={styles.loanItemButton} onClick={() => {
                          const selected = {
                            value: equipment.equipmentId,
                            label: equipment.equipmentName
                          };
                          //setSelectedEquipmentToLoan(selected)
                          setModalOpen(!modalOpen);
                          setModalContent(
                            <AddLoan
                              selectedEquipment={selected}
                              onClose={() => setModalOpen(false)}
                            />
                          )
                          //handleShowComponent("AddLoan");
                        }}>
                          <FaHandshake />
                        </button>
                      }
                      {!equipment.equipmentLoanStatus && <button title="Remover" className={styles.deleteItemButton} onClick={() => {
                        setModalOpen(!modalOpen);
                        handleShowComponent("DeleteEquipment", equipment.equipmentId);
                      }}>
                        <FaTrash />
                      </button>}
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
            document={<EquipmentsReport data={dataToReports} />}
          >
            {({ blob, loading }) => {
              if (blob && !loading && !isDownloading.current) {
                isDownloading.current = true
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = 'equipamentos.pdf';
                link.style.display = 'none';

                link.onclick = () => {
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