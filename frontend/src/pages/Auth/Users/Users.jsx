import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"

import { FaPlus, FaFilter, FaTrash, FaUser, FaListUl } from "react-icons/fa";

import styles from "./Users.module.css"

import Pagination from '../../../components/Pagination/Pagination';
import Modal from '../../../components/Modal/Modal';

import { getUsers, reset } from "../../../slices/authSlice";

import AddUser from '../../../components/AddUser/AddUser'
import DeleteUser from '../../../components/DeleteUser/DeleteUser';

import QueryFilter from '../../../QueryFilter/UsersQueryFilter/UsersQueryFilter';

import { formatToBrazilianDate } from '../../../utils/dateFormatter';
import UpdateUser from '../../../components/UpdateUser/UpdateUser';



const Users = () => {
  const { users, usersCount } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth) || {}
  const dispatch = useDispatch();

  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const [openQueryFilter, setOpenQueryFilter] = useState(false);
  const [filters, setFilters] = useState({
          username: "",
          email: "",
          role: "",
      });

  const handleShowComponent = (componentName, data = null) => {
    componentName === "AddUser" ? setModalContent(<AddUser />) : null;
    componentName === "UpdateUser" ? setModalContent(<UpdateUser selectedUser={data} setModalOpen={setModalOpen} />) : null;
    componentName === "DeleteUser" ? setModalContent(<DeleteUser data={data} setModalOpen={setModalOpen} />) : null;
};

  useEffect(() => {
    dispatch(getUsers({ user, limit, offset, filters }));
    console.table(users)
    dispatch(reset());
  }, [])

  useEffect(() => {
    dispatch(getUsers({ user, limit, offset, filters }));
    console.table(users)
    dispatch(reset());
  }, [limit, offset, filters])

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
          <button title="Novo Usuário" className={styles.newItemButton} onClick={() => {
            setModalOpen(!modalOpen);
            handleShowComponent("AddUser");
          }}>
            <FaPlus />
          </button>
          <p className={styles.pipe}>|</p>
          <button title="Filtrar" className={styles.filterButton} onClick={() => setOpenQueryFilter((prev) => !prev)}>
            <FaFilter />
          </button>
        </div>
        <table>
          <thead className={styles.tableHeader}>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {users && users.map((user, index) => (
              <tr key={user.id} className={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>
                  <button title="Detalhes" className={styles.editUserButton} onClick={() => {
                    setModalOpen(!modalOpen);
                    handleShowComponent("UpdateUser", user);
                  }}><FaListUl /></button>
                  <button title="Apagar" className={styles.deleteUserButton} onClick={() => {
                    setModalOpen(!modalOpen);
                    handleShowComponent("DeleteUser", user.email);
                  }}><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination registerCount={usersCount} limit={limit} setLimit={setLimit} offset={offset} setOffset={setOffset} />
      </div>
            {
                openQueryFilter && <QueryFilter setOpenQueryFilter={setOpenQueryFilter} setFilters={setFilters} filtersInPage={filters} />
            }
    </div>
  )
}

export default Users