import React, { useState, useEffect, useRef } from 'react'
import { BlobProvider } from '@react-pdf/renderer';
import styles from './GenerateEquipmentReport.module.css';

import { getEquipments, reset } from "../../slices/equipmentSlice";
import { useSelector, useDispatch } from "react-redux"
import { toast } from 'react-toastify';
import EquipmentsReport from '../../reports/equipmentsReport';
import { exportToExcel } from '../../utils/exportToXlsx';

const GenerateEquipmentReport = ({ data }) => {

  const { equipments } = useSelector((state) => state.equipment);
  const { user } = useSelector((state) => state.auth) || {}
  const dispatch = useDispatch();

  const isDownloading = useRef(false);
  const [reportState, setReportState] = useState({
    generating: false,
    downloaded: false,
  })

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


  const handleVerifyTypeOfReport = () => {
    if (data.typeOfReport == "pdf") {
      handleDownloadPdf();
    } else if (data.typeOfReport == "xlsx") {
      handleDownloadXlsx();
    }
  }

  const handleDownloadPdf = () => {
    setReportState({
      generating: true,
      downloaded: false
    })
    isDownloading.current = false;
  }

  const handleDownloadXlsx = () => {
    exportToExcel(dataToReports, data.entity);
  };

  useEffect(() => {
    dispatch(getEquipments({ user, limit: 300, offset: 0, filters: data.filters }));
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p className={styles.message}>Deseja <span className={styles.highlight}>gerar</span> relarório?</p>
        <div className={styles.actions}>
          <button className={`${styles.button} ${styles.confirmButton}`} onClick={() => {
            handleVerifyTypeOfReport();
          }}>Sim</button>
        </div>
        {reportState.generating && !reportState.downloaded && (
          <p className={styles.loading}>
            Gerando relatório...
          </p>
        )}
      </div>
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

export default GenerateEquipmentReport