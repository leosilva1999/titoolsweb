import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { FaWhatsapp, FaPhone } from "react-icons/fa";
import styles from "./Equipment.module.css"

import { useDispatch, useSelector } from "react-redux"
import { formatToBrazilianDate } from '../../utils/dateFormatter';

import { getEquipmentWithLoans } from '../../slices/equipmentSlice';

const Equipment = () => {
    const { id } = useParams();
    const { equipmentWithLoans, message, error, loading, success } = useSelector((state) => state.equipment);

    const dispatch = useDispatch();

    console.log("Equipment page param: " + id);

    useEffect(() => {
        dispatch(getEquipmentWithLoans({ equipmentId: id }));
    }, [])

    if (loading || !equipmentWithLoans) {
        return <p>Carregando...</p>;
    }

    return (
        <div className={styles.page}>
            <div className={styles.equipmentBox}>
                <h2>{equipmentWithLoans[0].equipmentName}</h2>
                <p>Tipo de equipmento: {equipmentWithLoans[0].type}</p>
                <p>Modelo: {equipmentWithLoans[0].manufacturer} {equipmentWithLoans[0].model}</p>
                {equipmentWithLoans[0].equipmentLoanStatus ?
                    <p style={{ color: "red", fontWeight: "bold" }}>Atualmente Emprestado</p>
                    :
                    <p style={{ color: "green", fontWeight: "bold" }}>Disponível</p>
                }
                <div className={styles.loansContainer}>
                    <label className={styles.loansHeader}><h3>Empréstimos</h3></label>
                    <table>
                        <thead className={styles.tableHeader}>
                            <th>Solicitante</th>
                            <th>Status</th>
                        </thead>
                        <tbody>
                            {
                                equipmentWithLoans && equipmentWithLoans[0].loans.map((loan, index) => (
                                    <tr className={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                                        <td>{loan.applicantName}</td>
                                        <td>{loan.loanStatus == true ? (
                                            <label className={`${styles.statusBase} ${styles.statusEmAndamento}`}>Em andamento</label>
                                        ) : (
                                            <label className={`${styles.statusBase} ${styles.statusFinalizado}`}>Finalizado</label>
                                        )
                                        }
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <p>Encontrou este equipamento perdido?<br/> Entre em contato com a TI:</p>
                <p><FaPhone style={{ color: "black", fontWeight: "bold" }} /> (61) 3441-5000<br />
                <FaWhatsapp style={{ color: "green", fontWeight: "bold" }} /> (61) 9 8198-0561</p>
            </div>
        </div>
    )
}

export default Equipment