import React, { useState, useEffect } from "react";
import styles from "./AddLoan.module.css"

import {useSelector, useDispatch} from "react-redux"
import { getEquipments } from '../../slices/equipmentSlice';
import { getLoans, postLoan } from "../../slices/loanSlice";
import Select, {components} from 'react-select'
import { toast } from 'react-toastify';

const AddLoan = () =>{
    const [applicantName, setApplicantName] = useState("");
    const [requestTime, setRequestTime] = useState("");
    
    const [loanIds, setLoanIds] = useState([]);
    const { user } = useSelector((state) => state.auth) || {}
    const {equipments, message, error, loading, success} = useSelector((state) => state.equipment);
    const [limit, setLimit] = useState(20);
    const [offset, setOffset] = useState(0);

    const [equipmentsSelect, setEquipmentsSelect] = useState();
    
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(getEquipments({user, limit, offset}));
        setEquipmentsSelect(equipments)
    }, [])

  
    useEffect(()=>{
      dispatch(getEquipments({user, limit, offset}));
      setEquipmentsSelect(...equipments)
    }, [limit, offset])

    const options = equipments && equipments.map((equipment) =>(
        {
            value: equipment.equipmentId, 
            label: equipment.equipmentName
        }
    ))
      
    const handleAddLoan = async (e) => {
            e.preventDefault();
        
            const loan = {
              applicantName: applicantName,
              requestTime: requestTime,
              equipmentIds: loanIds
            };
        
            dispatch(postLoan({user, body: loan}))
    }

    //const handleShowMoreSelect = async

        
    useEffect(()=>{
            if(loading == false && success == true && message != null){
                toast.success(message ? message.message : 'Operação realizada com sucesso!')
                dispatch(reset())
            }
            else if(loading == false && success == false && message != null){
                toast.error(message ? message.message : 'Ocorreu um erro.');
                dispatch(reset())
            }
          }, [success, error, message, dispatch])


    // menulist personlizado
    const CustomMenuList = ({children, ...props}) => {
        return(
            <components.MenuList{...props}>
                {children}
                <button className={styles.loadMoreBtn}>
                    {loading ? "Carregando..." : "Carregar mais"}
                </button>
            </components.MenuList>
        )
    }

    return(
        <div className={styles.addLoanContainer}>
                    <div className={styles.brand}>
                        <div className={styles.brandTextTop}><h3>Novo Emprestimo</h3></div>
                    </div>
                    <form onSubmit={handleAddLoan}>
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
                                maxMenuHeight={150}
                                menuPlacement="auto" 
                                options={options} 
                                placeholder="Selecione os equipamentos"
                                components={{MenuList: CustomMenuList}}
                                onChange={(selectedOptions) => {
                                    const selectedValues = selectedOptions.map(option => option.value)
                                    setLoanIds(selectedValues)
                                }} 
                            />
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