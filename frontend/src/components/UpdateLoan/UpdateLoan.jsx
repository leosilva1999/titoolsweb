import React, { useState, useEffect } from "react";
import styles from "./UpdateLoan.module.css"


import { useSelector, useDispatch } from "react-redux"
import { getEquipments, updateStatus } from '../../slices/equipmentSlice';
import { putLoan, reset } from "../../slices/loanSlice";

import {FaEdit, FaSave} from "react-icons/fa";
import Select, { components } from 'react-select'
import { toast } from 'react-toastify';

import { formatToBrazilianDate } from '../../utils/dateFormatter';

const UpdateLoan = ({ selectedLoan }) => {
    const [applicantName, setApplicantName] = useState("");
    const [authorizedBy, setAuthorizedBy] = useState("");
    const [requestTime, setRequestTime] = useState("");
    const [returnTime, setReturnTime] = useState("");

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [loanIds, setLoanIds] = useState([]);
    const { user } = useSelector((state) => state.auth) || {}
    const { availableEquipments, message, error, loading, success } = useSelector((state) => state.equipment);

    const [isUpdating, setIsUpdating] = useState(false);

    const [limit, setLimit] = useState(300);
    const [offset, setOffset] = useState(0);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getEquipments({ user, limit, offset }));
    }, [])

    useEffect(() => {
        dispatch(getEquipments({ user, limit, offset, filters: { equipmentLoanStatus: false }, forSelect: true }));
    }, [limit, offset])

    useEffect(() => {
        if (selectedLoan && selectedLoan.equipments) {
            const initialOptions = selectedLoan.equipments.map(se => ({
                value: se.equipmentId,
                label: se.equipmentName
            }));
            setSelectedOptions(initialOptions);
            setLoanIds(initialOptions.map(option => option.value))
        }
    }, [selectedLoan])

    const options = availableEquipments && availableEquipments.map((equipment) => (
        {
            value: equipment.equipmentId,
            label: equipment.equipmentName
        }
    ))

    const handleUpdateLoan = async (e) => {
        e.preventDefault();

        let loan = {};
        
        applicantName ? loan = {...loan, applicantName: applicantName} : null;
        authorizedBy ? loan = {...loan, authorizedBy: authorizedBy} : null;
        requestTime ? loan = {...loan, requestTime: requestTime} : null;
        returnTime ? loan = {...loan, returnTime: returnTime} : null;
        loanIds ? loan = {...loan, equipmentIds: loanIds} : null;

        let selectedLoanEquipmentIds = selectedLoan.equipments.map(se => se.equipmentId)

        let equipmentsToRemove = selectedLoanEquipmentIds.filter(equipmentId => !loanIds.some(le => le === equipmentId))
        equipmentsToRemove && dispatch(updateStatus({user, equipmentStatus: false , body: equipmentsToRemove }))

        dispatch(putLoan({ user, loanId: selectedLoan.loanId, body: loan }))
        dispatch(updateStatus({user, equipmentStatus: true , body: loanIds })) 
    }

    const handleCancelEdit = () => {
        setIsUpdating(false);

        setSelectedOptions(selectedLoan.equipments.map(se => ({
            value: se.equipmentId,
            label: se.equipmentName
        })));
        setLoanIds(selectedLoan.equipments.map(se => se.equipmentId));
        setApplicantName("");
        setAuthorizedBy("");
        setRequestTime("");
        setReturnTime("");
    }


    useEffect(() => {
        if (loading == false && success == true && message != null) {
            toast.success(message ? message.message : 'Operação realizada com sucesso!')
            setIsUpdating(false)
            dispatch(reset())
        }
        else if (loading == false && success == false && message != null) {
            toast.error(message ? message.message : 'Ocorreu um erro.');
            dispatch(reset())
        }
    }, [success, error, message, dispatch])


    const loadMoreEquipmentsSelect = () => {
        setLimit(limit + 10);
    }

    // menulist personlizado
    const CustomMenuList = ({ children, ...props }) => {
        return (
            <components.MenuList{...props}>
                {children}
                <button onClick={() => loadMoreEquipmentsSelect()} className={styles.loadMoreBtn}>
                    {loading ? "Carregando..." : "Carregar mais"}
                </button>
            </components.MenuList>
        )
    }

    return (
        <div className={styles.addLoanContainer}>
            <div className={styles.brand}>
                {!isUpdating && <div className={styles.brandTextTop}><h3>Detalhes do Emprestimo</h3></div>}
                {isUpdating && <div className={styles.brandTextTop}><h3>Editar Emprestimo</h3></div>}
            </div>
            <form onSubmit={handleUpdateLoan}>
                <div className={styles.inputBox}>
                    <input
                        type='text'
                        value={applicantName}
                        disabled={!isUpdating}
                        placeholder={selectedLoan.applicantName}
                        onChange={(e) => setApplicantName(e.target.value)}
                        
                    />
                </div>
                <div className={styles.inputBox}>
                    <input
                        type='text'
                        value={authorizedBy}
                        disabled={!isUpdating}
                        placeholder={selectedLoan.authorizedBy}
                        onChange={(e) => setAuthorizedBy(e.target.value)}
                        
                    />
                </div>
                <div className={styles.inputBox}>
                    {!requestTime && <label className="absolute left-3 top-2 text-grey-400 pointer-events-none">Data da retirada</label>}
                    {isUpdating && <input
                        type="datetime-local"
                        value={selectedLoan.requestTime}
                        disabled={!isUpdating}
                        onChange={(e) => setRequestTime(e.target.value)}
                        onFocus={(e) => e.target.showPicker()}
                        className="w-full border p-2 text-black bg-transparent"
                        
                    />}
                    {!isUpdating && <input type="text" disabled={!isUpdating} placeholder={formatToBrazilianDate(selectedLoan.requestTime)} />}
                </div>
                {selectedLoan.returnTime && <div className={styles.inputBox}>
                    {!returnTime && <label className="absolute left-3 top-2 text-grey-400 pointer-events-none">Data da devolução</label>}
                    {isUpdating && <input
                        type="datetime-local"
                        value={selectedLoan.returnTime}
                        disabled={!isUpdating}
                        onChange={(e) => setReturnTime(e.target.value)}
                        onFocus={(e) => e.target.showPicker()}
                        className="w-full border p-2 text-black bg-transparent"
                        
                    />}
                    {!isUpdating && <input type="text" disabled={!isUpdating} placeholder={formatToBrazilianDate(selectedLoan.returnTime)} />}
                </div>}
                <div className={styles.inputBox}>
                    <Select
                        isMulti
                        isDisabled={!isUpdating}
                        isLoading={!options}
                        maxMenuHeight={150}
                        menuPlacement="auto"
                        value={selectedOptions}
                        options={options}
                        placeholder="Selecione os equipamentos"
                        components={{ MenuList: CustomMenuList }}
                        onChange={(selectedOptions) => {
                            setSelectedOptions(selectedOptions || []);
                            setLoanIds(selectedOptions ? selectedOptions.map(option => option.value) : []);
                        }}
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

export default UpdateLoan;