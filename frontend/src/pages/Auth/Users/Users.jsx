import React, { useEffect, useState } from 'react'

import styles from "./Users.module.css"

import Pagination from '../../../components/Pagination/Pagination';
import Modal from '../../../components/Modal/Modal';


import { formatToBrazilianDate } from '../../../utils/dateFormatter';
import { useSelector, useDispatch } from "react-redux"


const Users = () => {
  return (
    <div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        {modalContent}
      </Modal>
    </div>
  )
}

export default Users