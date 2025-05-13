import React, { useState, useEffect } from 'react'
import styles from "./FinishLoan.module.css"

import { putLoan, reset } from "../../slices/loanSlice";
import { updateStatus } from '../../slices/equipmentSlice';
import { useSelector, useDispatch } from "react-redux"
import { formatToISO } from '../../utils/dateFormatter';
import { toast } from 'react-toastify';

const FinishLoan = ({ loanToFinish, setModalOpen }) => {

    const [returnTime, setReturnTime] = useState("");

    const { user } = useSelector((state) => state.auth) || {}
    const { error, loading, success, message } = useSelector((state) => state.loan);

    const dispatch = useDispatch();

    const handleFinishLoan = async(e) => {
        e.preventDefault();

        dispatch(putLoan({ user, loanId: loanToFinish.loanId, body: { loanStatus: false, returnTime: returnTime } }));
        let loanEquipments = loanToFinish.equipments.map(e => e.equipmentId)
        dispatch(updateStatus({ user, equipmentStatus: false, body: loanEquipments }))
        setModalOpen(false);
    }

    useEffect(()=>{
        setReturnTime(formatToISO(Date()))
    },[])

    useEffect(() => {

        if (!loading) {
            if (success && message == "NoContent") {
                toast.success('Operação realizada com sucesso!');
                window.location.reload();
                dispatch(reset());
            }
        }
        else if (error) {
            toast.error(message ? message : 'Erro ao finalizar o empréstimo.');
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