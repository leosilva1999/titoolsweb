import React, { useState } from "react";
import styles from "./EquipmentsQueryFilter.module.css"

const QueryFilter = ({ setOpenQueryFilter, setFilters, filtersInPage }) => {
    const [equipmentName, setEquipmentName] = useState(filtersInPage.equipmentName);
    const [macAddress, setMacAddress] = useState(filtersInPage.macAddress);
    const [equipmentLoanStatus, setEquipmentLoanStatus] = useState(filtersInPage.equipmentLoanStatus);


    const handleFilter = async (e) => {
        e.preventDefault();

        const filters = {
            equipmentName,
            equipmentLoanStatus,
            macAddress
        };

        setFilters(filters);
        setOpenQueryFilter(false);
    }

    return (
        <div className={styles.background} onClick={() => setOpenQueryFilter(false)}>
            <div className={styles.queryFilter} onClick={(e) => e.stopPropagation()}>
                <div className={styles.container}>
                    <ul className={styles.filterFieldsList}>
                        <div className={styles.fieldsContainer}>
                            <form onSubmit={handleFilter}>
                                <div className={styles.inputBox}>
                                    <label className={styles.fieldLabel}>Status:</label>
                                    <select value={equipmentLoanStatus} onChange={(e) => setEquipmentLoanStatus(e.target.value)}>
                                        <option value="">Todos</option>
                                        <option value="true">Emprestado</option>
                                        <option value="false">Disponível</option>
                                    </select>
                                </div>
                                <div className={styles.inputBox}>
                                    <input
                                        type='text'
                                        value={equipmentName}
                                        placeholder='Nome do equipamento'
                                        onChange={(e) => setEquipmentName(e.target.value)}
                                    />
                                </div>
                                <div className={styles.inputBox}>
                                    <input
                                        type='text'
                                        value={macAddress}
                                        placeholder='Endereço MAC'
                                        onChange={(e) => setMacAddress(e.target.value)}
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