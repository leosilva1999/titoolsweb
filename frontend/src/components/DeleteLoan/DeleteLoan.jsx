import React, { useState, useEffect } from 'react'

import styles from './DeleteLoan.module.css';

import { getLoans, deleteLoan, reset } from "../../slices/loanSlice";
import { useSelector, useDispatch } from "react-redux"
import { toast } from 'react-toastify';

const DeleteLoan = ({ data, setModalOpen }) => {

    const { user } = useSelector((state) => state.auth) || {}
    const { error, loading, success, message } = useSelector((state) => state.loan);

    const [filters, setFilters] = useState({
        orderByDescending: true
    });

    const dispatch = useDispatch();

    const handleDeleteLoan = async () => {
        await dispatch(deleteLoan({ user, loanId: data })).unwrap();
        dispatch(getLoans({ user, limit: 10, offset: 0, filters }));
        setModalOpen(false);
    }

    useEffect(() => {
        if(loading == false && success == true && message != null){
            toast.success('Empréstimo excluído!');
            dispatch(reset());
        }
        else if (error) {
            toast.error(message ? message : 'Erro ao remover o empréstimo.');
            dispatch(reset());
        }
    }, [success, message, dispatch, error, setModalOpen])

    return (
        <div>
            <div className={styles.content}>
                <p className={styles.message}>Deseja realmente <span className={styles.highlight}>remover</span> este item?</p>
                <button className={`${styles.button} ${styles.confirmButton}`} onClick={() => handleDeleteLoan()}>{!loading ? "Sim" : "Deletando..."}</button>
            </div>
        </div>
    )
}

export default DeleteLoan