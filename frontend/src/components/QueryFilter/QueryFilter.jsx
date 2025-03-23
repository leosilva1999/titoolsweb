import React, { useState, useEffect } from "react";
import styles from "./QueryFilter.module.css"

const QueryFilter = ({ setOpenQueryFilter }) => {
    const [applicantName, setApplicantName] = useState("");
    const [authorizedBy, setAuthorizedBy] = useState("");
    const [requestTime, setRequestTime] = useState("");
    const [returnTime, setReturnTime] = useState("");
    const [status, setStatus] = useState("");

    const handleFilter = async (e) => {
        e.preventDefault();
        console.log("handleFilter:"  + status);
        return null;
    }

    return (
        <div className={styles.background} onClick={() => setOpenQueryFilter(false)}>
            <div className={styles.queryFilter} onClick={(e) => e.stopPropagation()}>
                <div className={styles.container}>
                    <ul className={styles.filterFieldsList}>
                        <div className={StyleSheet.fieldsContainer}>
                            <form onSubmit={handleFilter}>
                                <div className={styles.inputBox}>
                                    {!status && <label>Status:</label>}
                                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                                        <option value="">Todos</option>
                                        <option value="true">Em Andamento</option>
                                        <option value="false">Finalizado</option>
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
                                    {!requestTime && <label>Data da retirada:</label>}
                                    <input
                                        type="datetime-local"
                                        value={requestTime}
                                        placeholder="Data de retirada"
                                        onChange={(e) => setRequestTime(e.target.value)}
                                        onFocus={(e) => e.target.showPicker()}
                                    />
                                </div>
                                <div className={styles.inputBox}>
                                    {!requestTime && <label>Data da devolução:</label>}
                                    <input
                                        type="datetime-local"
                                        value={returnTime}
                                        placeholder="Data de devolução"
                                        onChange={(e) => setReturnTime(e.target.value)}
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