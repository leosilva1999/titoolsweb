import React, { useState, useEffect } from "react";
import styles from "./UpdateEquipment.module.css"


import { useSelector, useDispatch } from "react-redux"
import { putEquipment, reset } from '../../slices/equipmentSlice';

import {FaEdit, FaSave} from "react-icons/fa";
import { toast } from 'react-toastify';

import { formatToBrazilianDate } from '../../utils/dateFormatter';

const UpdateEquipment = ({ selectedEquipment }) => {
    const [equipmentName, setEquipmentName] = useState("");
    const [ipAddress, setIpAddress] = useState("");
    const [macAddress, setMacAddress] = useState("");

    const { user } = useSelector((state) => state.auth) || {}
    const { message, error, loading, success } = useSelector((state) => state.equipment);

    const [isUpdating, setIsUpdating] = useState(false);

    //const [limit, setLimit] = useState(300);
    //const [offset, setOffset] = useState(0);

    const dispatch = useDispatch();

    const handleUpdateEquipment = async (e) => {
        e.preventDefault();

        let equipment = {};
        
        equipmentName ? equipment = {...equipment, equipmentName: equipmentName} : null;
        ipAddress ? equipment = {...equipment, ipAddress: ipAddress} : null;
        macAddress ? equipment = {...equipment, macAddress: macAddress} : null;

        dispatch(putEquipment({ user, equipmentId: selectedEquipment.equipmentId, body: equipment })) 
    }

    const handleCancelEdit = () => {
        setIsUpdating(false);

        setEquipmentName("");
        setIpAddress("");
        setMacAddress("");
    }


    useEffect(() => {
        if (loading == false && success == true && message == "Equipamento alterado com sucesso!") {
            toast.success(message ? message.message : 'Operação realizada com sucesso!')
            setIsUpdating(false)
            dispatch(reset())
        }
        else if (loading == false && success == false && message != null) {
            toast.error(message ? message.message : 'Ocorreu um erro.');
            dispatch(reset())
        }
    }, [success, error, message, dispatch])

    return (
        <div className={styles.addLoanContainer}>
            <div className={styles.brand}>
                {!isUpdating && <div className={styles.brandTextTop}><h3>Detalhes do Equipamento</h3></div>}
                {isUpdating && <div className={styles.brandTextTop}><h3>Editar Equipamento</h3></div>}
            </div>
            <form onSubmit={handleUpdateEquipment}>
                <div className={styles.inputBox}>
                    <input
                        type='text'
                        value={equipmentName}
                        disabled={!isUpdating}
                        placeholder={selectedEquipment.equipmentName}
                        onChange={(e) => setEquipmentName(e.target.value)}
                        
                    />
                </div>
                <div className={styles.inputBox}>
                    <input
                        type='text'
                        value={ipAddress}
                        disabled={!isUpdating}
                        placeholder={selectedEquipment.ipAddress}
                        onChange={(e) => setIpAddress(e.target.value)}
                        
                    />
                </div>
                <div className={styles.inputBox}>
                    <input
                        type='text'
                        value={macAddress}
                        disabled={!isUpdating}
                        placeholder={selectedEquipment.macAddress}
                        onChange={(e) => setMacAddress(e.target.value)}
                        
                    />
                </div>           
                <div className={styles.formButtonsContainer}>
                    {!isUpdating && <button
                        type="button"
                        disabled={loading}
                        className={styles.AddLoanBtn}
                        onClick={() => setIsUpdating(!isUpdating)}
                    >
                        <FaEdit/> Editar
                    </button>}
                    {isUpdating && <button
                        type="submit"
                        disabled={loading}
                        className={styles.AddLoanBtn}
                    >
                        <FaSave/>{loading ? "Salvando..." : "Salvar"}
                    </button>}
                    {isUpdating && <button
                        type="button"
                        className={styles.CancelBtn}
                        onClick={handleCancelEdit}
                    >
                        Cancelar
                    </button>
                    }
                </div>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {/*success && <p style={{ color: "green" }}>{message.message}</p>*/}
        </div>
    )
}

export default UpdateEquipment;