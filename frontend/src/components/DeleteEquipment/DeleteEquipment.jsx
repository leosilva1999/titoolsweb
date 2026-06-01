import React, { useState, useEffect } from "react";

import styles from './DeleteEquipment.module.css';

import { deleteEquipment, reset } from "../../slices/equipmentSlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

const DeleteEquipment = ({ data }) => {
  const { user } = useSelector((state) => state.auth) || {};
  const { error, loading, success, message } = useSelector(
    (state) => state.equipment,
  );

  const dispatch = useDispatch();

  const handleDeleteEquipment = () => {
    dispatch(deleteEquipment({ user, equipmentId: data }));
  };

  useEffect(() => {
    if (loading == false && success == true && message != null) {
      toast.success(message ? message : "Operação realizada com sucesso!");
      window.location.reload();
      dispatch(reset());
    } else if (loading == false && success == false && message != null) {
      toast.error(message ? message : "Ocorreu um erro.");
      dispatch(reset());
    }
  }, [success, error, message, dispatch]);

  return (
    <div>
      <div className={styles.content}>
        <p className={styles.message}>
          Deseja realmente <span className={styles.highlight}>remover</span>{" "}
          este item?
        </p>
        <button
          className={`${styles.button} ${styles.confirmButton}`}
          onClick={() => handleDeleteEquipment()}
        >
          {!loading ? "Sim" : "Deletando..."}
        </button>
      </div>
    </div>
  );
};

export default DeleteEquipment;
