import React, { useState, useEffect } from "react";
import styles from "./UpdateEquipment.module.css"


import { useSelector, useDispatch } from "react-redux"
import { getEquipmentWithLoans, putEquipment, reset } from '../../slices/equipmentSlice';

import { FaEdit, FaSave } from "react-icons/fa";
import { toast } from 'react-toastify';

import { formatToBrazilianDate } from '../../utils/dateFormatter';

const UpdateEquipment = ({ selectedEquipment }) => {
    const [equipmentName, setEquipmentName] = useState(selectedEquipment.equipmentName);
    const [ipAddress, setIpAddress] = useState(selectedEquipment.ipAddress);
    const [macAddress, setMacAddress] = useState(selectedEquipment.macAddress);
    const [type, setType] = useState(selectedEquipment.type);
    const [manufacturer, setManufacturer] = useState(selectedEquipment.manufacturer);
    const [model, setModel] = useState(selectedEquipment.model);

    const { user } = useSelector((state) => state.auth) || {}
    const { equipmentWithLoans, message, error, loading, success } = useSelector((state) => state.equipment);

    const [isUpdating, setIsUpdating] = useState(false);

    //const [limit, setLimit] = useState(300);
    //const [offset, setOffset] = useState(0);

    const dispatch = useDispatch();

    const handleUpdateEquipment = async (e) => {
        e.preventDefault();

        let equipment = {};

        equipmentName && equipmentName != selectedEquipment.equipmentName ? equipment = { ...equipment, equipmentName: equipmentName } : null;
        ipAddress && ipAddress != selectedEquipment.ipAddress ? equipment = { ...equipment, ipAddress: ipAddress } : null;
        macAddress && macAddress != selectedEquipment.macAddress ? equipment = { ...equipment, macAddress: macAddress } : null;
        type && type != selectedEquipment.type ? equipment = { ...equipment, type: type } : null;
        manufacturer && manufacturer != selectedEquipment.manufacturer ? equipment = { ...equipment, manufacturer: manufacturer } : null;
        model && model != selectedEquipment.model ? equipment = { ...equipment, model: model } : null;

        dispatch(putEquipment({ user, equipmentId: selectedEquipment.equipmentId, body: equipment }))
    }

    const handleCancelEdit = () => {
        setIsUpdating(false);

        setEquipmentName("");
        setIpAddress("");
        setMacAddress("");
        setType("");
        setManufacturer("");
        setModel("");
    }

    useEffect(() => {
        dispatch(getEquipmentWithLoans({ user, equipmentId: selectedEquipment.equipmentId }));
    }, [])


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
                <div className={styles.inputBox}>
                    <input
                        type='text'
                        value={type}
                        disabled={!isUpdating}
                        placeholder={selectedEquipment.type}
                        onChange={(e) => setType(e.target.value)}

                    />
                </div>
                <div className={styles.inputBox}>
                    <input
                        type='text'
                        value={manufacturer}
                        disabled={!isUpdating}
                        placeholder={selectedEquipment.manufacturer}
                        onChange={(e) => setManufacturer(e.target.value)}

                    />
                </div>
                <div className={styles.inputBox}>
                    <input
                        type='text'
                        value={model}
                        disabled={!isUpdating}
                        placeholder={selectedEquipment.model}
                        onChange={(e) => setModel(e.target.value)}

                    />
                </div>
                {
                    !isUpdating && <div className={styles.loansContainer}>
                    <label className={styles.loansHeader}><h3>Empréstimos</h3></label>
                        <table>
                            <thead className={styles.tableHeader}>
                                <th>Solicitante</th>
                                <th>Solicitado</th>
                                <th>Devolvido</th>
                                <th>Status</th>
                            </thead>
                            <tbody>
                                {
                                    equipmentWithLoans && equipmentWithLoans[0].loans.map((loan, index) => (
                                        <tr className={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                                            <td>{loan.applicantName}</td>
                                            <td>{formatToBrazilianDate(loan.requestTime)}</td>
                                            <td>{loan.returnTime ? formatToBrazilianDate(loan.returnTime) : "-"}</td>
                                            <td>{loan.loanStatus == true ? (
                                                <label className={`${styles.statusBase} ${styles.statusEmAndamento}`}>Em andamento</label>
                                            ) : (
                                                <label className={`${styles.statusBase} ${styles.statusFinalizado}`}>Finalizado</label>
                                            )
                                            }
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                }
                <div className={styles.formButtonsContainer}>
                    {!isUpdating && <button
                        type="button"
                        disabled={loading}
                        className={styles.AddLoanBtn}
                        onClick={() => setIsUpdating(!isUpdating)}
                    >
                        <FaEdit /> Editar
                    </button>}
                    {isUpdating && <button
                        type="submit"
                        disabled={loading}
                        className={styles.AddLoanBtn}
                    >
                        <FaSave />{loading ? "Salvando..." : "Salvar"}
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