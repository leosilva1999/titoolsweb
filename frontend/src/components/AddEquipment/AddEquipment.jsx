import React, { useEffect, useState } from 'react'
import styles from "./AddEquipment.module.css"

import {postEquipment, reset} from "../../slices/equipmentSlice";
import {useSelector, useDispatch} from "react-redux"
import { toast } from 'react-toastify';

const AddEquipment = () => {

    const [nome, setNome] = useState("");
    const [ipAddress, setIpAddress] = useState("");
    const [macAddress, setMacAddress] = useState("");

    const { user } = useSelector((state) => state.auth) || {}
    const {error, loading, success, message} = useSelector((state) => state.equipment);

    const dispatch = useDispatch();

    const handleAddEquipment = async (e) => {
        e.preventDefault();
    
        const equipment = {
          equipmentName: nome,
          ipAddress: ipAddress,
          macAddress: macAddress,
          qrCode: null,
          equipmentLoanStatus: false,
        };
    
        dispatch(postEquipment({user, body: equipment}))
        
       /*if(loading == false && success == true){
            toast.success(message || 'Operação realizada com sucesso!')
        }
        else{
            toast.error(message || 'Ocorreu um erro.');
        }*/
      }

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


      // clean auth states
      /* useEffect(() => {
          dispatch(reset())
        }, [dispatch]);*/

    return (
        <div className={styles.addEquipmentContainer}>
            <div className={styles.brand}>
                <div className={styles.brandTextTop}><h2>Novo Equipamento</h2></div>
            </div>
            <form onSubmit={handleAddEquipment}>
                <div className={styles.inputBox}>
                    <input
                        type='text'
                        value={nome}
                        placeholder='Nome'
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.inputBox}>
                    <input
                        type="text"
                        value={ipAddress}
                        placeholder='Endereço Ip'
                        onChange={(e) => setIpAddress(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.inputBox}>
                    <input
                        type="text"
                        value={macAddress}
                        placeholder='Endereço MAC'
                        onChange={(e) => setMacAddress(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className={styles.AddEquipmentBtn}
                >
                    {loading ? "Adicionando..." : "Adicionar"}
                </button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {/*success && <p style={{ color: "green" }}>{message.message}</p>*/}
        </div>
    )
}

export default AddEquipment