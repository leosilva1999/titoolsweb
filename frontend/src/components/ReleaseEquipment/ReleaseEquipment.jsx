import React, { useState, useEffect } from 'react'

import styles from "./ReleaseEquipment.module.css";

import { deleteEquipmentFromLoan, reset } from "../../slices/loanSlice";
import { updateStatus } from "../../slices/equipmentSlice";

import { useSelector, useDispatch } from "react-redux"
import { toast } from 'react-toastify';

const ReleaseEquipment = ({ data }) => {

    const { user } = useSelector((state) => state.auth) || {}
    const { error, loading, success, message } = useSelector((state) => state.equipment);

    const dispatch = useDispatch();

    const handleReleaseEquipment = async () => {
        await dispatch(deleteEquipmentFromLoan({ user, equipmentId: data })).unwrap();
        await dispatch(updateStatus({ user, equipmentStatus: false, body: [data] })).unwrap();
    }

    useEffect(() => {
        if (loading == false && success == true && message != null) {
            toast.success(message ? message : 'Operação realizada com sucesso!');
            window.location.reload();
            dispatch(reset());
        }
        else if (loading == false && success == false && message != null) {
            toast.error(message ? message : 'Ocorreu um erro.');
            dispatch(reset());
        }
    }, [success, error, message, dispatch])

    return (
        <div>
            <div className={styles.content}>
                <p className={styles.message}>Deseja realmente <label style={{ color: "red", fontWeight: "bold" }}>remover</label> este item do empréstimo atual?</p>
                <div className={styles.actions}>
                    <button className={`${styles.button} ${styles.confirmButton}`} onClick={() => handleReleaseEquipment()}>Sim</button>
                </div>
                {loading && <p className={styles.loading}>Removendo...</p>}
            </div>
        </div>
    )
}

export default ReleaseEquipment