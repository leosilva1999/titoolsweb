import React, { useEffect, useState } from 'react'
import styles from "./LoanList.module.css"
import { FaPlus, FaFilter, FaTrash, FaUndo } from "react-icons/fa";

//hooks
import {useSelector, useDispatch} from "react-redux"

import { getLoans, postLoan } from "../../slices/loanSlice";
import { toast } from 'react-toastify';


const LoanList = () => {

    const {loans, loansCount, error, loading, success, message} = useSelector((state) => state.loan);
    const { user } = useSelector((state) => state.auth) || {}
    const dispatch = useDispatch();

    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);

    useEffect(()=>{
        dispatch(getLoans({user, limit, offset}));
        console.table(loans)
    }, [])

  return (
    <div className={styles.loanListContainer}>
        <div className={styles.loanListTable}>
            <table className={styles.table}>
                <tr>
                    <th>Id</th>
                    <th>Solicitante</th>
                    <th>Retirada</th>
                    <th>Retorno</th>
                </tr>
                {loans && loans.map((loan) => (
                    <tr>
                        <th>{loan.loanId}</th>
                        <th>{loan.applicantName}</th>
                        <th>{loan.requestTime}</th>
                        <th>{loan.returnTime ? loan.returnTime : "Em aberto"}</th>
                        <th>
                            <button><FaUndo/></button>
                            <button><FaTrash/></button>
                        </th>
                    </tr>
                ))}
            </table>
        </div>
    </div>
  )
}

export default LoanList