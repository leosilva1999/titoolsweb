import React, { useState, useEffect } from "react";
import styles from "./UsersQueryFilter.module.css"
import {useSelector, useDispatch} from "react-redux"
import { getUsers, reset } from "../../slices/authSlice";

const QueryFilter = ({ setOpenQueryFilter, setFilters, filtersInPage }) => {
    const [username, setUsername] = useState(filtersInPage.username);
    const [email, setEmail] = useState(filtersInPage.email);
    const [role, setRole] = useState(filtersInPage.email);

    const handleFilter = async (e) => {
        e.preventDefault();

        const filters = {
            username,
            email,
            role
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
                                    <input
                                        type='text'
                                        value={username}
                                        placeholder='Nome'
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div className={styles.inputBox}>
                                    <input
                                        type='email'
                                        value={email}
                                        placeholder='E-mail'
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className={styles.inputBox}>
                                    <label className={styles.fieldLabel}>Nível de acesso:</label>
                                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                                        <option value="">Todos</option>
                                        <option value="superadmin">Super Administrador</option>
                                        <option value="admin">Administrador</option>
                                        <option value="user">Usuário</option>
                                    </select>
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