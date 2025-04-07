import React, { useState, useEffect } from "react";
import styles from "./LoansQueryFilter.module.css"
import {useSelector, useDispatch} from "react-redux"
import { getLoans, reset } from "../../slices/loanSlice";

const QueryFilter = ({ setOpenQueryFilter, setFilters, filtersInPage }) => {
    const [applicantName, setApplicantName] = useState(filtersInPage.applicantName);
    const [authorizedBy, setAuthorizedBy] = useState(filtersInPage.authorizedBy);
    const [requestTimeMin, setRequestTimeMin] = useState(filtersInPage.requestTimeMin);
    const [requestTimeMax, setRequestTimeMax] = useState(filtersInPage.requestTimeMax);
    const [returnTimeMin, setReturnTimeMin] = useState(filtersInPage.returnTimeMin);
    const [returnTimeMax, setReturnTimeMax] = useState(filtersInPage.returnTimeMax);
    const [loanStatus, setLoanStatus] = useState(filtersInPage.loanStatus);
    const [orderByDescending, setOrderByDescending] = useState(filtersInPage.orderByDescending);

    const handleFilter = async (e) => {
        e.preventDefault();

        const filters = {
            applicantName,
            authorizedBy,
            requestTimeMin,
            requestTimeMax,
            returnTimeMin,
            returnTimeMax,
            loanStatus,
            orderByDescending
        };

        setFilters(filters);
        setOpenQueryFilter(false);
    }

    return (
        <div className={styles.background} onClick={() => setOpenQueryFilter(false)}>
            <div className={styles.queryFilter} onClick={(e) => e.stopPropagation()}>
                <div className={styles.container}>
                    <ul className={styles.filterFieldsList}>
                        <div className={StyleSheet.fieldsContainer}>
                            <form onSubmit={handleFilter}>
                                <div className={styles.inputBox}>
                                    <label className={styles.fieldLabel}>Status:</label>
                                    <select value={loanStatus} onChange={(e) => setLoanStatus(e.target.value)}>
                                        <option value="">Todos</option>
                                        <option value="true">Em Andamento</option>
                                        <option value="false">Finalizado</option>
                                    </select>
                                </div>
                                <div className={styles.inputBox}>
                                    <label className={styles.fieldLabel}>Ordenar por:</label>
                                    <select value={orderByDescending} onChange={(e) => setOrderByDescending(e.target.value)}>
                                        <option value="true">Mais recentes</option>
                                        <option value="false">Mais antigos</option>
                                    </select>
                                </div>
                                <div className={styles.inputBox}>
                                    <input
                                        type='text'
                                        value={applicantName}
                                        placeholder='Requisitante'
                                        onChange={(e) => setApplicantName(e.target.value)}
                                    />
                                </div>
                                <div className={styles.inputBox}>
                                    <input
                                        type='text'
                                        value={authorizedBy}
                                        placeholder='Autorizado por'
                                        onChange={(e) => setAuthorizedBy(e.target.value)}
                                    />
                                </div>
                                <div className={styles.inputBox}>
                                    <label className={styles.fieldLabel}>Data da retirada entre:</label>
                                    <input
                                        type="date"
                                        value={requestTimeMin}
                                        onChange={(e) => setRequestTimeMin(e.target.value)}
                                        onFocus={(e) => e.target.showPicker()}
                                    />
                                </div>
                                <div className={styles.inputBox}>
                                    <label className={styles.fieldLabel}>e:</label>
                                    <input
                                        type="date"
                                        value={requestTimeMax}
                                        onChange={(e) => setRequestTimeMax(e.target.value)}
                                        onFocus={(e) => e.target.showPicker()}
                                    />
                                </div>
                                <div className={styles.inputBox}>
                                    <label className={styles.fieldLabel}>Data da devolução entre:</label>
                                    <input
                                        type="date"
                                        value={returnTimeMin}
                                        onChange={(e) => setReturnTimeMin(e.target.value)}
                                        onFocus={(e) => e.target.showPicker()}
                                    />
                                </div>
                                <div className={styles.inputBox}>
                                    <label className={styles.fieldLabel}>e:</label>
                                    <input
                                        type="date"
                                        value={returnTimeMax}
                                        onChange={(e) => setReturnTimeMax(e.target.value)}
                                        onFocus={(e) => e.target.showPicker()}
                                    />
                                </div>
                                <button type="submit" className={styles.FilterBtn}>Filtrar</button>
                            </form>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default QueryFilter