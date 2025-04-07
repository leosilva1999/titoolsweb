import React, { useEffect, useState } from 'react'
import styles from "./LoanList.module.css"
import { FaPlus, FaFilter, FaTrash, FaUndo, FaEdit, FaHandshake, FaListUl } from "react-icons/fa";
import Pagination from '../../components/Pagination/Pagination';
import Modal from '../../components/Modal/Modal';
import AddLoan from '../../components/AddLoan/AddLoan';

import { formatToBrazilianDate } from '../../utils/dateFormatter';

//hooks
import { useSelector, useDispatch } from "react-redux"

import { getLoans, postLoan, reset } from "../../slices/loanSlice";
import { toast } from 'react-toastify';
import LoansQueryFilter from '../../QueryFilter/LoansQueryFilter/LoansQueryFilter';
import DeleteLoan from '../../components/DeleteLoan/DeleteLoan';


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

    const handleShowComponent = (componentName, data = null) => {
        componentName === "AddLoan" ? setModalContent(<AddLoan data={data} />) : null;
        componentName === "DeleteLoan" ? setModalContent(<DeleteLoan data={data} />) : null;
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

    return (
        <div>
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                {modalContent}
            </Modal>
            <div className={styles.loansHeader}>
                <label><FaHandshake /></label>
                <h2>Empréstimos</h2>
            </div>
            <div className={styles.loanListContainer}>
                <div className={styles.loanListTable}>
                    <div className={styles.topListButtons}>
                        <button className={styles.newItemButton} onClick={() => {
                            setModalOpen(!modalOpen);
                            handleShowComponent("AddLoan");
                        }}>
                            <FaPlus />
                        </button>
                        <button className={styles.filterButton} onClick={() => setOpenQueryFilter((prev) => !prev)}>
                            <FaFilter />
                        </button>
                    </div>
                    <table>
                        <tr className={styles.tableHeader}>
                            <th>Id</th>
                            <th>Solicitante</th>
                            <th>Autorizado por</th>
                            <th>Retirada</th>
                            <th>Retorno</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                        {loans && loans.result.map((loan) => (
                            <tr className={styles.tableBody}>
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
                                    <button className={styles.editLoanButton}><FaListUl /></button>
                                    {loan.loanStatus && <button className={styles.undoLoanButton}><FaUndo /></button>}
                                    <button className={styles.deleteLoanButton} onClick={() => {
                                        setModalOpen(!modalOpen);
                                        handleShowComponent("DeleteLoan", loan.loanId);
                                    }}><FaTrash /></button>
                                </td>
                            </tr>
                        ))}
                    </table>
                    <Pagination registerCount={loanCount} limit={limit} setLimit={setLimit} offset={offset} setOffset={setOffset} />
                </div>
            </div>
            {
                openQueryFilter && <LoansQueryFilter setOpenQueryFilter={setOpenQueryFilter} setFilters={setFilters} filtersInPage={filters} />
            }
        </div>
    )
}

export default LoanList