import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"

import { FaPlus, FaFilter, FaTrash, FaUser, FaListUl } from "react-icons/fa";

import styles from "./Users.module.css"

import Pagination from '../../../components/Pagination/Pagination';
import Modal from '../../../components/Modal/Modal';

import { getUsers, reset } from "../../../slices/authSlice";


import { formatToBrazilianDate } from '../../../utils/dateFormatter';



const Users = () => {
  const { users, usersCount, error, loading, success, message } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth) || {}
  const dispatch = useDispatch();

  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  useEffect(() => {
    dispatch(getUsers({ user, limit, offset }));
    console.table(users)
    dispatch(reset());
  }, [])

  useEffect(() => {
    dispatch(getUsers({ user, limit, offset }));
    console.table(users)
    dispatch(reset());
  }, [limit, offset])

  return (
    <div className={styles.usersPage}>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        {modalContent}
      </Modal>
      <div className={styles.usersHeader}>
        <div className={styles.headerIcon}>
          <label><FaUser /></label>
        </div>
        <h2>Usuários</h2>
      </div>
      <div className={styles.usersTable}>
        <div className={styles.topListButtons}>
          <button title="Novo Empréstimo" className={styles.newItemButton} /*onClick={() => {
            setModalOpen(!modalOpen);
            handleShowComponent("AddLoan");
          }}*/>
            <FaPlus />
          </button>
          <p className={styles.pipe}>|</p>
          <button title="Filtrar" className={styles.filterButton} onClick={() => setOpenQueryFilter((prev) => !prev)}>
            <FaFilter />
          </button>
        </div>
        <table>
          <thead className={styles.tableHeader}>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Ações</th>
          </thead>
          <tbody className={styles.tableBody}>
            {users && users.map((user, index) => (
              <tr className={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>
                  <button title="Detalhes" className={styles.editUserButton} /*onClick={() => {
                    setModalOpen(!modalOpen);
                    handleShowComponent("UpdateLoan", loan);
                  }}*/><FaListUl /></button>
                  <button title="Apagar" className={styles.deleteUserButton} /*onClick={() => {
                    setModalOpen(!modalOpen);
                    handleShowComponent("DeleteLoan", loan.loanId);
                  }}*/><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination registerCount={usersCount} limit={limit} setLimit={setLimit} offset={offset} setOffset={setOffset} />
      </div>

    </div>
  )
}

export default Users