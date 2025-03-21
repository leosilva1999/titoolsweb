import React, { useState, useEffect } from "react";
import styles from "./QueryFilter.module.css"

const QueryFilter = ({ setOpenQueryFilter }) => {
    const [applicantName, setApplicantName] = useState(null);
    const [authorizedBy, setAuthorizedBy] = useState(null);
    const [requestTime, setRequestTime] = useState(null);
    const [returnTime, setReturnTime] = useState(null);

    return (
        <div className={styles.background} onClick={() => setOpenQueryFilter(false)}>
            <div className={styles.queryFilter}>
                <div className={styles.container}>
                    <ul className={styles.filterFieldsList}>
                        <div className={StyleSheet.fieldsContainer}>
                            <form onSubmit={handleFilter}>
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
                                    {!requestTime && <label className="absolute left-3 top-2 text-grey-400 pointer-events-none">Data da retirada</label>}
                                    <input
                                        type="datetime-local"
                                        value={requestTime}
                                        placeholder="Data de retirada"
                                        onChange={(e) => setRequestTime(e.target.value)}
                                        onFocus={(e) => e.target.showPicker()}
                                        className="w-full border p-2 text-black bg-transparent"
                                    />
                                </div>
                                <div className={styles.inputBox}>
                                    {!requestTime && <label className="absolute left-3 top-2 text-grey-400 pointer-events-none">Data da retirada</label>}
                                    <input
                                        type="datetime-local"
                                        value={returnTime}
                                        placeholder="Data de devolução"
                                        onChange={(e) => setReturnTime(e.target.value)}
                                        onFocus={(e) => e.target.showPicker()}
                                        className="w-full border p-2 text-black bg-transparent"
                                    />
                                </div>
                                <button>Filtrar</button>
                            </form>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default QueryFilter