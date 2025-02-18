import React, { useState } from "react";
import styles from "./AddLoan.module.css"

import {useSelector, useDispatch} from "react-redux"
import Select from 'react-select'
import { toast } from 'react-toastify';

const AddLoan = () =>{
    const [applicantName, setApplicantName] = useState("");
    const [requestTime, setRequestTime] = useState("");
    const [equipmentIds, setEquipmentIds] = useState([]);

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]
      


    const { user } = useSelector((state) => state.auth) || {}
    const {error, loading, success, message} = useSelector((state) => state.equipment);
    
    const dispatch = useDispatch();

    return(
        <div className={styles.addLoanContainer}>
                    <div className={styles.brand}>
                        <div className={styles.brandTextTop}><h3>Novo Emprestimo</h3></div>
                    </div>
                    <form /*onSubmit={handleAddLoan}*/>
                        <div className={styles.inputBox}>
                            <input
                                type='text'
                                value={applicantName}
                                placeholder='Requisitante'
                                onChange={(e) => setApplicantName(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.inputBox}>
                            <input
                                type="datetime-local"
                                value={requestTime}
                                placeholder='Hora da requisição'
                                onChange={(e) => setRequestTime(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.inputBox}>
                            <Select isMulti options={options}></Select>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={styles.AddLoanBtn}
                        >
                            {loading ? "Adicionando..." : "Adicionar"}
                        </button>
                    </form>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {/*success && <p style={{ color: "green" }}>{message.message}</p>*/}
                </div>
    )
}

export default AddLoan;