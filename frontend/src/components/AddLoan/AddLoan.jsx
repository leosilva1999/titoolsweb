import React, { useState, useEffect } from "react";
import styles from "./AddLoan.module.css"

import { useSelector, useDispatch } from "react-redux"
import { getEquipments, updateStatus } from '../../slices/equipmentSlice';
import { postLoan, reset } from "../../slices/loanSlice";
import Select, { components } from 'react-select'
import { toast } from 'react-toastify';

const AddLoan = ({selectedEquipment}) => {
    const [applicantName, setApplicantName] = useState("");
    const [authorizedBy, setAuthorizedBy] = useState("");
    const [requestTime, setRequestTime] = useState("");

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [loanIds, setLoanIds] = useState([]);
    const { user } = useSelector((state) => state.auth) || {}
    const { availableEquipments, message, error, loading, success } = useSelector((state) => state.equipment);
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
        if(selectedEquipment && selectedEquipment.value){
            setSelectedOptions([selectedEquipment]);
            setLoanIds([selectedEquipment.value]);
        };

    }, [selectedEquipment])

    const options = availableEquipments && availableEquipments.map((equipment) => (
        {
            value: equipment.equipmentId,
            label: equipment.equipmentName
        }
    ))

    const handleAddLoan = async (e) => {
        e.preventDefault();

        const loan = {
            applicantName: applicantName,
            authorizedBy: authorizedBy,
            requestTime: requestTime,
            returnTime: null,
            equipmentIds: loanIds
        };

        dispatch(postLoan({ user, body: loan }));
        dispatch(updateStatus({user, equipmentStatus: true , body: loanIds }));
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


    useEffect(() => {
        return () => {
            setSelectedOptions([]);
            setLoanIds([]);
        };
    }, []);

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
                    <input
                        type='text'
                        value={authorizedBy}
                        placeholder='Autorizado por...'
                        onChange={(e) => setAuthorizedBy(e.target.value)}
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