import React, { useEffect, useState } from 'react'
import styles from "./AddUser.module.css"

import Select, { components } from 'react-select'
import { getUsers, createUser, addUserToRole, reset } from "../../slices/authSlice";
import { useSelector, useDispatch } from "react-redux"
import { toast } from 'react-toastify';

const AddUser = () => {
    
    const { error, loading, success } = useSelector((state) => state.auth);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [userRole, setUserRole] = useState("");

    const options = [
        { value: 'superadmin', label: 'Super Administrador' },
        { value: 'admin', label: 'Administrador' },
        { value: 'user', label: 'Usuário comum' }
      ];

    const [verifyPassword, setVerifyPassword] = useState("");

    const { user } = useSelector((state) => state.auth) || {}


    const dispatch = useDispatch();

    const handleAddUser = async (e) => {
        e.preventDefault();

        const userToAdd = {
            username: username,
            email: email,
            password: password
        };

        if(password !== confirmPassword){
            setVerifyPassword("As senhas não são iguais");
            return;
        }

        setVerifyPassword("");

        try{
            const response = await dispatch(createUser({user: userToAdd})).unwrap();

        if(response.status == "Success"){
            await dispatch(addUserToRole({
                user,
                body:{
                    email: email,
                    roleName: userRole.value
                }
            })).unwrap();

            toast.success("Usuário criado e adicionado à role!");
            dispatch(getUsers({ user, limit: 10, offset: 0 }));
        }
        }catch(error){
            toast.error(error.message || "Erro ao processar a requisição");
        }
    }

    useEffect(() => {
        if (loading == false && success == true) {
            //toast.success(message ? message.message : 'Operação realizada com sucesso!')
            dispatch(reset())
        }
        else if (loading == false && success == false) {
            //toast.error(message ? message.message : 'Ocorreu um erro.');
            dispatch(reset())
        }
    }, [success, error, dispatch])


    // clean auth states
    /* useEffect(() => {
        dispatch(reset())
      }, [dispatch]);*/

    return (
        <div className={styles.addUserContainer}>
            <div className={styles.brand}>
                <div className={styles.brandTextTop}><h3>Novo usuário</h3></div>
            </div>
            <form onSubmit={handleAddUser}>
                <div className={styles.inputBox}>
                    <input
                        type='text'
                        value={username}
                        placeholder='Nome do usuário'
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.inputBox}>
                    <input
                        type="email"
                        value={email}
                        placeholder='E-mail'
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.inputBox}>
                    <input
                        type="password"
                        value={password}
                        placeholder='Senha'
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.inputBox}>
                    <input
                        type="password"
                        value={confirmPassword}
                        placeholder='Confirmar Senha'
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.inputBox}>
                    <Select
                        maxMenuHeight={150}
                        menuPlacement="auto"
                        options={options}
                        placeholder="Nivel de acesso"
                        onChange={setUserRole}
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className={styles.AddUserBtn}
                >
                    {loading ? "Adicionando..." : "Adicionar"}
                </button>
            </form>
            {verifyPassword && <p style={{ color: "red" }}>{verifyPassword}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {/*success && <p style={{ color: "green" }}>{message.message}</p>*/}
        </div>
    )
}

export default AddUser