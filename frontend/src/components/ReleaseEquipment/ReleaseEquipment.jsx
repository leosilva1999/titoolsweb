import React, { useState, useEffect } from 'react'

import styles from "./ReleaseEquipment.module.css";

import { deleteEquipmentFromLoan, reset as loanReset } from "../../slices/loanSlice";
import { updateStatus, getEquipments, reset as equipmentReset } from "../../slices/equipmentSlice";

import { useSelector, useDispatch } from "react-redux"
import { toast } from 'react-toastify';

const ReleaseEquipment = ({ data, setModalOpen }) => {

    const { user } = useSelector((state) => state.auth) || {}
    const { error: equipmentError, loading: equipmentLoading, success: equipmentSuccess, message: equipmentMessage } = useSelector((state) => state.equipment);
    const { error: loanError, loading: loanLoading, success: loanSuccess, message: loanMessage } = useSelector((state) => state.loan);

    const dispatch = useDispatch();

    const handleReleaseEquipment = async () => {
        await dispatch(deleteEquipmentFromLoan({ user, equipmentId: data })).unwrap();
        await dispatch(updateStatus({ user, equipmentStatus: false, body: [data] })).unwrap();
        dispatch(getEquipments({ user, limit: 10, offset: 0 }));
        setModalOpen(false);
    }

    useEffect(() => {
        if (loanLoading == false && loanSuccess == false && loanMessage != null) {
            toast.error(loanMessage ? loanMessage : 'Ocorreu um erro.');
        }
    }, [loanError, loanLoading, loanSuccess, loanMessage, dispatch])

    useEffect(() => {
        if (equipmentLoading == false && equipmentSuccess == true && equipmentMessage != null) {
            toast.success('Equipamento removido do empréstimo!');
            dispatch(loanReset())
            dispatch(equipmentReset())
        }
        else if (equipmentLoading == false && equipmentSuccess == false && equipmentMessage != null) {
            toast.error(equipmentMessage ? equipmentMessage : 'Ocorreu um erro.');
        }
    }, [equipmentError, equipmentLoading, equipmentSuccess, equipmentMessage, dispatch])

    return (
        <div>
            <div className={styles.content}>
                <p className={styles.message}>Deseja realmente <label style={{ color: "red", fontWeight: "bold" }}>remover</label> este item do empréstimo atual?</p>
                <div className={styles.actions}>
                    <button className={`${styles.button} ${styles.confirmButton}`} onClick={() => handleReleaseEquipment()}>Sim</button>
                </div>
                {equipmentLoading && <p className={styles.loading}>Removendo...</p>}
            </div>
        </div>
    )
}

export default ReleaseEquipment