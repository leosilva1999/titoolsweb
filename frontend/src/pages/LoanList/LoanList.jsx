import React, { useEffect, useState, useRef } from 'react'
import styles from "./LoanList.module.css"
import { FaPlus, FaFilter, FaTrash, FaUndo, FaHandshake, FaListUl, FaFilePdf, FaTable } from "react-icons/fa";
import { BlobProvider } from '@react-pdf/renderer';

import Pagination from '../../components/Pagination/Pagination';
import Modal from '../../components/Modal/Modal';
import AddLoan from '../../components/AddLoan/AddLoan';
import LoansReport from '../../reports/loansReport';

import { formatToBrazilianDate } from '../../utils/dateFormatter';
import { exportToExcel } from '../../utils/exportToXlsx'

//hooks
import { useSelector, useDispatch } from "react-redux"

import { getLoans, postLoan, reset } from "../../slices/loanSlice";
import { toast } from 'react-toastify';
import LoansQueryFilter from '../../QueryFilter/LoansQueryFilter/LoansQueryFilter';
import DeleteLoan from '../../components/DeleteLoan/DeleteLoan';
import UpdateLoan from '../../components/UpdateLoan/UpdateLoan';
import FinishLoan from '../../components/FinishLoan/FinishLoan';


const LoanList = () => {

    const { loans, loanCount, error, loading, success, message } = useSelector((state) => state.loan);
    const { user } = useSelector((state) => state.auth) || {}
    const dispatch = useDispatch();

    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);

    const [filters, setFilters] = useState({
        applicantName: "",
        authorizedBy: "",
        requestTimeMin: "",
        requestTimeMax: "",
        returnTimeMin: "",
        returnTimeMax: "",
        loanStatus: "",
        orderByDescending: ""
    });

    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [openQueryFilter, setOpenQueryFilter] = useState(false);

    const isDownloading = useRef(false);
    const [reportState, setReportState] = useState({
        generating: false,
        downloaded: false,
    })

    const handleShowComponent = (componentName, data = null) => {
        componentName === "AddLoan" ? setModalContent(<AddLoan />) : null;
        componentName === "UpdateLoan" ? setModalContent(<UpdateLoan selectedLoan={data} />) : null;
        componentName === "DeleteLoan" ? setModalContent(<DeleteLoan data={data} />) : null;
        componentName === "FinishLoan" ? setModalContent(<FinishLoan loanToFinish={data} setModalOpen={setModalOpen} />) : null;
    };

    useEffect(() => {
        dispatch(getLoans({ user, limit, offset, filters }));
        console.table(loans)
        dispatch(reset());
    }, [])

    useEffect(() => {
        dispatch(getLoans({ user, limit, offset, filters }));
        console.table(loans)
        dispatch(reset());
    }, [limit, offset, filters])

    const dataToReports = loans && loans.result.map(loan => ({
        ID: loan.loanId,
        Solicitante: loan.applicantName,
        Autorizado_por: loan.authorizedBy,
        Retirada: formatToBrazilianDate(loan.requestTime),
        Retorno: formatToBrazilianDate(loan.returnTime),
        Status: loan.loanStatus ? "Em andamento" : "Finalizado"
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
            <div className={styles.loansHeader}>
                <div className={styles.headerIcon}>
                    <label><FaHandshake /></label>
                </div>
                <h2>Empréstimos</h2>
            </div>
            <div className={styles.loanListContainer}>
                <div className={styles.loanListTable}>
                    <div className={styles.topListButtons}>
                        <button title="Novo Empréstimo" className={styles.newItemButton} onClick={() => {
                            setModalOpen(!modalOpen);
                            handleShowComponent("AddLoan");
                        }}>
                            <FaPlus />
                        </button>
                        <p className={styles.pipe}>|</p>
                        <button title="Exportar PDF" className={styles.exportButton} onClick={() => {
                            handleDownloadPdf();
                        }}>
                            <FaFilePdf />
                        </button>
                        <button title="Exportar para Excel" className={styles.exportButton} onClick={() => {
                            exportToExcel(dataToReports, "Empréstimos");
                        }}>
                            <FaTable />
                        </button>
                        <p className={styles.pipe}>|</p>
                        <button title="Filtrar" className={styles.filterButton} onClick={() => setOpenQueryFilter((prev) => !prev)}>
                            <FaFilter />
                        </button>
                    </div>
                    <table>
                        <thead className={styles.tableHeader}>
                            <th>Id</th>
                            <th>Solicitante</th>
                            <th>Autorizado por</th>
                            <th>Retirada</th>
                            <th>Retorno</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </thead>
                        <tbody className={styles.tableBody}>
                            {loans && loans.result.map((loan, index) => (
                                <tr className={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                                    <td>{loan.loanId}</td>
                                    <td>{loan.applicantName}</td>
                                    <td>{loan.authorizedBy}</td>
                                    <td>{formatToBrazilianDate(loan.requestTime)}</td>
                                    <td>{loan.returnTime ? formatToBrazilianDate(loan.returnTime) : "-"}</td>
                                    <td>{loan.loanStatus == true ? (
                                        <p className={`${styles.statusBase} ${styles.statusEmAndamento}`}>Em andamento</p>
                                    ) : (
                                        <p className={`${styles.statusBase} ${styles.statusFinalizado}`}>Finalizado</p>
                                    )
                                    }
                                    </td>
                                    <td>
                                        <button title="Detalhes" className={styles.editLoanButton} onClick={() => {
                                            setModalOpen(!modalOpen);
                                            handleShowComponent("UpdateLoan", loan);
                                        }}><FaListUl /></button>
                                        {loan.loanStatus && <button title="Devolver" className={styles.undoLoanButton} onClick={
                                            ()=> {
                                                setModalOpen(!modalOpen);
                                                handleShowComponent("FinishLoan", loan);
                                            }
                                        }><FaUndo /></button>}
                                        {!loan.loanStatus && <button title="Apagar" className={styles.deleteLoanButton} onClick={() => {
                                            setModalOpen(!modalOpen);
                                            handleShowComponent("DeleteLoan", loan.loanId);
                                        }}><FaTrash /></button>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Pagination registerCount={loanCount} limit={limit} setLimit={setLimit} offset={offset} setOffset={setOffset} />
                </div>
            </div>
            {
                openQueryFilter && <LoansQueryFilter setOpenQueryFilter={setOpenQueryFilter} setFilters={setFilters} filtersInPage={filters} />
            }
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

export default LoanList