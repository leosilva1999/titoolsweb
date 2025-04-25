import React, { useState, useEffect } from "react";
import styles from "./UpdateLoan.module.css"

import { useSelector, useDispatch } from "react-redux"
import { getEquipments } from '../../slices/equipmentSlice';
import { putLoan, reset } from "../../slices/loanSlice";
import Select, { components } from 'react-select'
import { toast } from 'react-toastify';

import { formatToBrazilianDate } from '../../utils/dateFormatter';

const UpdateLoan = ({selectedLoan}) => {
    const [applicantName, setApplicantName] = useState("");
    const [authorizedBy, setAuthorizedBy] = useState("");
    const [requestTime, setRequestTime] = useState("");
    const [returnTime, setReturnTime] = useState("");

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [loanIds, setLoanIds] = useState([]);
    const { user } = useSelector((state) => state.auth) || {}
    const { availableEquipments, message, error, loading, success } = useSelector((state) => state.equipment);

    const [isUpdating, setIsUpdating] = useState(false);

    const [limit, setLimit] = useState(20);
    const [offset, setOffset] = useState(0);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getEquipments({ user, limit, offset }));
    }, [])

    useEffect(() => {
        dispatch(getEquipments({ user, limit, offset, filters: { equipmentLoanStatus: false }, forSelect: true }));
    }, [limit, offset])

    useEffect(() => {
        selectedLoan && selectedLoan.equipments.map(se => {
            setSelectedOptions(prevOptions => [...prevOptions, {
                value: se.equipmentId, 
                label: se.equipmentName
            }]);
            setLoanIds(prevOptions => [...prevOptions, se.equipmentId]);
        });
    }, [selectedLoan])

    const options = availableEquipments && availableEquipments.map((equipment) => (
        {
            value: equipment.equipmentId,
            label: equipment.equipmentName
        }
    ))

    const handleUpdateLoan = async (e) => {
        e.preventDefault();

        const loan = {
            applicantName: applicantName,
            authorizedBy: authorizedBy,
            requestTime: requestTime,
            returnTime: returnTime,
            equipmentIds: loanIds
        };

        dispatch(putLoan({ user, loanId: selectedLoan.loanId, body: loan }))
    }

    //const handleShowMoreSelect = async


    useEffect(() => {
        if (loading == false && success == true && message != null) {
            toast.success(message ? message.message : 'Operação realizada com sucesso!')
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
                <button onClick={() => loadMoreEquipmentsSelect} className={styles.loadMoreBtn}>
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
                        required
                    />
                </div>
                <div className={styles.inputBox}>
                    <input
                        type='text'
                        value={authorizedBy}
                        disabled={!isUpdating}
                        placeholder={selectedLoan.authorizedBy}
                        onChange={(e) => setAuthorizedBy(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.inputBox}>
                    {!requestTime && <label className="absolute left-3 top-2 text-grey-400 pointer-events-none">Data da retirada</label>}
                    {isUpdating && <input
                        type="datetime-local"
                        value={requestTime}
                        disabled={!isUpdating}
                        placeholder="Hora da requisição"
                        onChange={(e) => setRequestTime(e.target.value)}
                        onFocus={(e) => e.target.showPicker()}
                        className="w-full border p-2 text-black bg-transparent"
                        required
                    />}
                    {!isUpdating && <input type="text" placeholder={formatToBrazilianDate(selectedLoan.requestTime)}/>}
                </div>
                <div className={styles.inputBox}>
                    {!returnTime && <label className="absolute left-3 top-2 text-grey-400 pointer-events-none">Data da devolução</label>}
                    {isUpdating && <input
                        type="datetime-local"
                        value={returnTime}
                        disabled={!isUpdating}
                        placeholder="Hora da requisição"
                        onChange={(e) => setReturnTime(e.target.value)}
                        onFocus={(e) => e.target.showPicker()}
                        className="w-full border p-2 text-black bg-transparent"
                        required
                    />}
                    {!isUpdating && <input type="text" placeholder={formatToBrazilianDate(selectedLoan.returnTime)}/>}
                </div>
                <div className={styles.inputBox}>
                    <Select
                        isMulti
                        disabled={!isUpdating}
                        isLoading={!options}
                        maxMenuHeight={150}
                        menuPlacement="auto"
                        value={selectedOptions}
                        options={options}
                        placeholder="Selecione os equipamentos"
                        components={{ MenuList: CustomMenuList }}
                        onChange={(selectedOptions) => {
                            const selectedValues = selectedOptions.map(option => option.value)
                            setLoanIds(selectedValues)
                        }}
                    />
                </div>
                {!isUpdating && <button
                    type="button"
                    disabled={loading}
                    className={styles.AddLoanBtn}
                    onClick={()=> setIsUpdating(!isUpdating)}
                >
                    {isUpdating ? "Cancelar" : "Editar"}
                </button>}
                {isUpdating && <button
                    type="submit"
                    disabled={loading}
                    className={styles.AddLoanBtn}
                >
                    {loading ? "Salvando..." : "Salvar"}
                </button>}
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {/*success && <p style={{ color: "green" }}>{message.message}</p>*/}
        </div>
    )
}

export default UpdateLoan;