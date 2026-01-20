import React, { useState, useEffect } from 'react'

import styles from "./DeleteUser.module.css";

import { getUsers, deleteUser, reset } from "../../slices/authSlice";
import { useSelector, useDispatch } from "react-redux"
import { toast } from 'react-toastify';

const DeleteUser = ({ data, setModalOpen }) => {

    const { user } = useSelector((state) => state.auth) || {}
    const { error, loading, success, message } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const handleDeleteUser = () => {
        dispatch(deleteUser({ user, email: data }));
    }

    useEffect(() => {

        if (!loading) {
            if (success && message == `User ${data} removed`) {
                toast.success(`Usuário ${data} removido!`);
                //window.location.reload();
                dispatch(getUsers({ user, limit: 10, offset: 0 }));
                dispatch(reset());
                setModalOpen(false);
            }
        }
        else if (error) {
            toast.error(message ? message : "Erro ao remover o usuário.");
            dispatch(reset());
        }
    }, [success, message, dispatch, error, setModalOpen])

    return (
        <div>
            <div className={styles.content}>
                <p className={styles.message}>Deseja realmente <span className={styles.highlight}>remover</span> esse usuário?</p>
                <div className={styles.actions}>
                    <button className={`${styles.button} ${styles.confirmButton}`} onClick={() => handleDeleteUser()}>{!loading ? "Sim" : "Deletando..."}</button>
                </div>
                {loading && <p className={styles.loading}>Removendo...</p>}
            </div>
        </div>
    )
}

export default DeleteUser