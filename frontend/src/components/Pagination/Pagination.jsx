import React, { useState, useEffect } from 'react'
import styles from './Pagination.module.css'

const MAX_ITEMS = 9;
const MAX_LEFT = (MAX_ITEMS - 1) / 2;

const Pagination = ({ limit, setLimit, registerCount, offset, setOffset }) => {
    const current = offset ? (offset / limit) + 1 : 1;
    const pages = Math.ceil(registerCount / limit);
    const first = Math.max(current - MAX_LEFT, 1);

    function onPageChange(page) {
        setOffset((page - 1) * limit);
    }

    useEffect(() => {
        console.log(limit)
    }, [limit])

    return (
        <div className={styles.paginationContainer}>
            <div className={styles.setLimitContainer}>
                <label>Itens por pagina:</label>
                <select value={limit} onChange={e => setLimit(e.target.value)}>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                </select>
            </div>
            <div>
                <ul className={styles.paginationButtons}>
                    <li><button onClick={() => onPageChange(current - 1)} disabled={current === 1}>Anterior</button></li>
                    {Array.from({ length: Math.min(MAX_ITEMS, pages) })
                        .map((_, index) => index + first)
                        .map((page) => (
                            <li key={page}>
                                <button
                                    className={page === current ? styles.paginationButtons__item__active : null}
                                    onClick={() => onPageChange(page)}
                                >
                                    {page}
                                </button>
                            </li>
                        ))
                    }
                    <li><button onClick={() => onPageChange(current + 1)} disabled={current === pages}>Próximo</button></li>
                </ul>
            </div>
            <p className={styles.registerCount}>Total: {registerCount}</p>
        </div>
    )
}

export default Pagination