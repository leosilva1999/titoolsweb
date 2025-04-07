import React, { useState, useEffect } from 'react'

import { deleteLoan, reset } from "../../slices/loanSlice";
import { useSelector, useDispatch } from "react-redux"
import { toast } from 'react-toastify';

const DeleteLoan = ({ data, setModalOpen }) => {

    const { user } = useSelector((state) => state.auth) || {}
    const { error, loading, success, message } = useSelector((state) => state.loan);

    const dispatch = useDispatch();

    const handleDeleteLoan = () => {
        dispatch(deleteLoan({ user, loanId: data }));
        setModalOpen(false);
    }

    useEffect(() => {

        if (!loading) {
            if(success && message == "Emprestimo excluído com sucesso!"){
                toast.success('Operação realizada com sucesso!');
                window.location.reload();
                dispatch(reset());
            }
        }
        else if (error) {
            toast.error(message ? message : 'Erro ao remover o empréstimo.');
            dispatch(reset());
        }
    }, [success, message, dispatch, error, setModalOpen])

    return (
        <div>
            <p>Deseja realmente <label style={{ color: "red", fontWeight: "bold" }}>remover</label> este item?</p>
            <button onClick={() => handleDeleteLoan()}>{!loading ? "Sim" : "Deletando..."}</button>
        </div>
    )
}

export default DeleteLoan