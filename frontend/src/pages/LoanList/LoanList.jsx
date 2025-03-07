import React, { useEffect, useState } from 'react'
import styles from "./LoanList.module.css"
import { FaPlus, FaFilter, FaTrash, FaUndo, FaEdit } from "react-icons/fa";
import Pagination from '../../components/Pagination/Pagination';

import { formatToBrazilianDate } from '../../utils/dateFormatter';

//hooks
import {useSelector, useDispatch} from "react-redux"

import { getLoans, postLoan } from "../../slices/loanSlice";
import { toast } from 'react-toastify';


const LoanList = () => {

    const {loans, loanCount, error, loading, success, message} = useSelector((state) => state.loan);
    const { user } = useSelector((state) => state.auth) || {}
    const dispatch = useDispatch();

    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);

    useEffect(()=>{
        dispatch(getLoans({user, limit, offset}));
        console.table(loans)
    }, [])

    useEffect(()=>{
        dispatch(getLoans({user, limit, offset}));
        console.table(loans)
    }, [limit, offset])

  return (
    <div className={styles.loanListContainer}>
        <div className={styles.loanListTable}>
            <table>
                <tr className={styles.tableHeader}>
                    <th>Id</th>
                    <th>Solicitante</th>
                    <th>Retirada</th>
                    <th>Retorno</th>
                    <th>Status</th>
                    <th>Ações</th>
                </tr>
                {loans && loans.map((loan) => (
                    <tr className={styles.tableBody}>
                        <td>{loan.loanId}</td>
                        <td>{loan.applicantName}</td>
                        <td>{formatToBrazilianDate(loan.requestTime)}</td>
                        <td>{loan.returnTime ? formatToBrazilianDate(loan.returnTime) : "-"}</td>
                        <td>{loan.returnTime ? (
                                    <p className={`${styles.statusBase} ${styles.statusFinalizado}`}>Finalizado</p>
                                ) : (
                                    <p className={`${styles.statusBase} ${styles.statusEmAndamento}`}>Em andamento</p>
                                )
                            }
                        </td>
                        <td>
                            <button className={styles.editLoanButton}><FaEdit/></button>
                            <button className={styles.undoLoanButton}><FaUndo/></button>
                            <button className={styles.deleteLoanButton}><FaTrash/></button>
                        </td>
                    </tr>
                ))}
            </table>
            <Pagination registerCount={loanCount} limit={limit} setLimit={setLimit} offset={offset} setOffset={setOffset} />
        </div>
    </div>
  )
}

export default LoanList