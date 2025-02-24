import React, { useState, useEffect } from "react";
import styles from "./AddLoan.module.css"

import {useSelector, useDispatch} from "react-redux"
import { getEquipments } from '../../slices/equipmentSlice';
import Select from 'react-select'
import { toast } from 'react-toastify';

const AddLoan = () =>{
    const [applicantName, setApplicantName] = useState("");
    const [requestTime, setRequestTime] = useState("");
    
    const [loanIds, setLoanIds] = useState([]);
    const { user } = useSelector((state) => state.auth) || {}
    const {equipments, equipmentCount, error, loading, success} = useSelector((state) => state.equipment);
    const [limit, setLimit] = useState(20);
    const [offset, setOffset] = useState(0);
    
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(getEquipments({user, limit, offset}));
    }, [])

  
    useEffect(()=>{
      dispatch(getEquipments({user, limit, offset}));
    }, [limit, offset])

    const options = equipments && equipments.map((equipment) =>(
        {
            value: equipment.equipmentId, 
            label: equipment.equipmentName
        }
    ))
      
    const handleShowEquipments = () =>{
        console.log("array de equipamentos: "+options[1]+"equipments count: "+ equipmentCount)
    }



    // menulist personlizado
    const CustomMenuList = ({children, ...props}) => {
        return(
            <div>
                {children}
                <button className={styles.loadMoreBtn}>
                    Carregar mais
                </button>
            </div>
        )
    }

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
                            {!requestTime && <label className="absolute left-3 top-2 text-grey-400 pointer-events-none">Data da retirada</label>}
                            <input
                                type="datetime-local"
                                value={requestTime}
                                placeholder="Hora da requisição"
                                onChange={(e) => setRequestTime(e.target.value)}
                                onFocus={(e) => e.target.showPicker()}
                                className="w-full border p-2 text-black bg-transparent"
                                required
                            />
                        </div>
                        <div className={styles.inputBox}>
                            <Select 
                                isMulti 
                                options={options} 
                                onChange={(e) => setLoanIds(e.target.value)} 
                                placeholder="Selecione os equipamentos"
                                components={{MenuList: CustomMenuList}}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={styles.AddLoanBtn}
                            onClick={handleShowEquipments}
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