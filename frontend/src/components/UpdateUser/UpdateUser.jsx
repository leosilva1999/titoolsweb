import React, { useState, useEffect } from "react";
import styles from "./UpdateUser.module.css"


import { useSelector, useDispatch } from "react-redux"
import { getRoles, putUser, addUserToRole, removeUserFromAllRoles, reset } from "../../slices/authSlice"

import { FaEdit, FaSave } from "react-icons/fa";
import { toast } from 'react-toastify';
import AsyncSelect from 'react-select/async';

import { formatToBrazilianDate } from '../../utils/dateFormatter';

const UpdateUser = ({ selectedUser }) => {
    const [username, setUsername] = useState(selectedUser.userName);
    const [email, setEmail] = useState(selectedUser.email);
    const [password, SetPassword] = useState("passwordhashToUpdade");

    const { user } = useSelector((state) => state.auth) || {}
    const { message, error, loading, success, roles } = useSelector((state) => state.auth);

    const [isUpdating, setIsUpdating] = useState(false);

    const [loadOptions, setLoadOptions] = useState(null);
    const [defaultOptions, setDefaultOptions] = useState([]);
    const [roleNames, setRoleNames] = useState([]);

    let selectUserRoleNames = selectedUser.roles.map(ro => ro.name)

    //const [limit, setLimit] = useState(300);
    //const [offset, setOffset] = useState(0);

    const dispatch = useDispatch();

    const handleUpdateUser = async (e) => {
        e.preventDefault();

        let userUpdated = {};

        username && username != selectedUser.userName ? userUpdated = { ...userUpdated, username: username } : null;
        email && email != selectedUser.email ? userUpdated = { ...userUpdated, email: email } : null;
        password && password != "passwordhashToUpdade" ? userUpdated = { ...userUpdated, password: password } : null;

        Object.keys(userUpdated).length != 0 && dispatch(putUser({ user, userId: selectedUser.id, body: userUpdated }));

        let rolesToRemove = selectUserRoleNames.filter(roleName => !roleNames.some(rn => rn === roleName));

        rolesToRemove.lenght > 0 && dispatch(removeUserFromAllRoles({ user, email: selectedUser.email }));

        roleNames.map(rn => dispatch(addUserToRole({ user, body:{email: selectedUser.email, roleName: rn} })))
    }

    const handleCancelEdit = () => {
        setIsUpdating(false);

        setUsername("");
        setEmail("");
        SetPassword("");
    }

    useEffect(() => {
        dispatch(getRoles({user, limit: 200, offset: 0}));
    }, [])

    useEffect(() => {
        if(roles != null){
            setLoadOptions(roles.map(role => ({
            value: role.id,
            label: role.name
        })));
        }
    }, [roles])

    useEffect(() => {
        setDefaultOptions(selectedUser.roles.map(role => ({
            value: role.id,
            label: role.name
        })))
    }, [selectedUser])


    useEffect(() => {
        if (loading == false && success == true && message == "User update successfully!") {
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
                {!isUpdating && <div className={styles.brandTextTop}><h3>Detalhes do usuário</h3></div>}
                {isUpdating && <div className={styles.brandTextTop}><h3>Editar Usuário</h3></div>}
            </div>
            <form onSubmit={handleUpdateUser}>
                <div className={styles.inputBox}>
                    <input
                        type='text'
                        value={username}
                        disabled={!isUpdating}
                        placeholder={selectedUser.username}
                        onChange={(e) => setUsername(e.target.value)}

                    />
                </div>
                <div className={styles.inputBox}>
                    <input
                        type='email'
                        value={email}
                        disabled={!isUpdating}
                        placeholder={selectedUser.email}
                        onChange={(e) => setEmail(e.target.value)}

                    />
                </div>
                <div className={styles.inputBox}>
                    <input
                        type='password'
                        value={password}
                        disabled={!isUpdating}
                        placeholder={password}
                        onChange={(e) => SetPassword(e.target.value)}

                    />
                </div>
                <div className={styles.inputBox}>
                    <label>Perfis de acesso</label>
                    <AsyncSelect
                        isMulti
                        isSearchable={false} 
                        //loadOptions={loadOptions}
                        defaultOptions={loadOptions}
                        isDisabled={!isUpdating}
                        menuPlacement="auto"
                        cacheOptions
                        debounceTime={500}
                        value={defaultOptions}
                        placeholder={"Roles do usuário"}
                        noOptionsMessage={() => "Nenhum resultado encontrado"}
                        loadingMessage={() => "Carregando..."}
                        onChange={(selectedOptions) => {
                            setDefaultOptions(selectedOptions || []);
                            setRoleNames(selectedOptions ? selectedOptions.map(option => option.label) : ["user"]);
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

export default UpdateUser;