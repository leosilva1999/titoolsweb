import React, {useState, useEffect} from 'react'

import {deleteEquipment, reset} from "../../slices/equipmentSlice";
import {useSelector, useDispatch} from "react-redux"
import { toast } from 'react-toastify';

const DeleteEquipment = ({data}) => {

    const { user } = useSelector((state) => state.auth) || {}
    const {error, loading, success, message} = useSelector((state) => state.equipment);

    const dispatch = useDispatch();

    const handleDeleteEquipment = () => {
        dispatch(deleteEquipment({user, equipmentId: data}))
      }

    useEffect(()=>{
            if(loading == false && success == true && message != null){
                toast.success(message ? message : 'Operação realizada com sucesso!');
                window.location.reload();
                dispatch(reset());
            }
            else if(loading == false && success == false && message != null){
                toast.error(message ? message : 'Ocorreu um erro.');
                dispatch(reset());
            }
          }, [success, error, message, dispatch])

  return (
    <div>
        <p>Deseja realmente <label style={{color: "red", fontWeight: "bold"}}>remover</label> este item?</p>
        <button onClick={() => handleDeleteEquipment()}>Sim</button>
    </div>
  )
}

export default DeleteEquipment