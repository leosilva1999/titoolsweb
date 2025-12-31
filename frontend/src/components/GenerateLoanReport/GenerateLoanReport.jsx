import React, { useState, useEffect, useRef } from 'react'
import { BlobProvider } from '@react-pdf/renderer';
import styles from './GenerateLoanReport.module.css';

import { getLoans } from "../../slices/loanSlice";
import { useSelector, useDispatch } from "react-redux"
import { toast } from 'react-toastify';
import LoansReport from '../../reports/loansReport';
import { formatToBrazilianDate } from '../../utils/dateFormatter';
import { exportToExcel } from '../../utils/exportToXlsx';

const GenerateLoanReport = ({ data }) => {

  const { loans } = useSelector((state) => state.loan);
  const { user } = useSelector((state) => state.auth) || {}
  const dispatch = useDispatch();

  const isDownloading = useRef(false);
  const [reportState, setReportState] = useState({
    generating: false,
    downloaded: false,
  })

  const dataToReports = loans && loans.result.map(loan => ({
    ID: loan.loanId,
    Solicitante: loan.applicantName,
    Autorizado_por: loan.authorizedBy,
    Retirada: formatToBrazilianDate(loan.requestTime),
    Retorno: formatToBrazilianDate(loan.returnTime),
    Status: loan.loanStatus ? "Em andamento" : "Finalizado"
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
    dispatch(getLoans({ user, limit: 300, offset: 0, filters: data.filters }));
  }, [])

  return (
    <div>
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
          document={<LoansReport data={dataToReports} />}
        >
          {({ blob, loading }) => {
            if (blob && !loading && !isDownloading.current) {
              isDownloading.current = true
              const link = document.createElement("a");
              link.href = URL.createObjectURL(blob);
              link.download = 'emprestimos.pdf';
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

export default GenerateLoanReport