import React, { useState, useEffect } from 'react'
import styles from "./FinishLoan.module.css"

import { getLoans, putLoan, reset } from "../../slices/loanSlice";
import { updateStatus, reset as equipmentReset } from '../../slices/equipmentSlice';
import { useSelector, useDispatch } from "react-redux"
import { formatToISO } from '../../utils/dateFormatter';
import { toast } from 'react-toastify';

const FinishLoan = ({ loanToFinish, setModalOpen }) => {

    const [returnTime, setReturnTime] = useState("");

    const [filters, setFilters] = useState({
        orderByDescending: true
    });

    const { user } = useSelector((state) => state.auth) || {}
    const { error, loading, success, message } = useSelector((state) => state.loan);

    const dispatch = useDispatch();

    const handleFinishLoan = async(e) => {
        e.preventDefault();

        await dispatch(putLoan({ user, loanId: loanToFinish.loanId, body: { loanStatus: false, returnTime: returnTime } })).unwrap();
        let loanEquipments = loanToFinish.equipments.map(e => e.equipmentId)
        await dispatch(updateStatus({ user, equipmentStatus: false, body: loanEquipments })).unwrap();
        dispatch(getLoans({ user, limit: 10, offset: 0, filters }));
        setModalOpen(false);
    }

    useEffect(()=>{
        setReturnTime(formatToISO(Date()))
    },[])

    useEffect(() => {
            if (loading == false && success == true && message != null) {
                toast.success('Empréstimo Finalizado!');
                dispatch(equipmentReset());
                dispatch(reset());
            }        
        else if (error) {
            toast.error(message ? message : 'Erro ao finalizar o empréstimo.');
            dispatch(equipmentReset());
            dispatch(reset());
        }
    }, [success, message, dispatch, error, setModalOpen])

    return (
        <div className={styles.finishLoanContainer}>
            <p>Quando deseja <label style={{ color: "red", fontWeight: "bold" }}>finalizar</label> este empréstimo?</p>
            <form onSubmit={handleFinishLoan}>
                <div className={styles.inputBox}>
                    <input
                        type="datetime-local"
                        value={returnTime}
                        onChange={(e) => setReturnTime(e.target.value)}
                        onFocus={(e) => e.target.showPicker()}
                        className="w-full border p-2 text-black bg-transparent"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className={styles.ConfirmBtn}>
                        {!loading ? "Confirmar" : "Finalizando..."}
                </button>
            </form>
        </div>
    )
}

export default FinishLoan