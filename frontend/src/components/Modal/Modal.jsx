import React from 'react'
import styles from "./Modal.module.css"
import {FaTimes}  from "react-icons/fa";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  
  return (
    <div className={styles.background}>
      <div className={styles.Modal}>
        <div className={styles.modalHeader}>
          <FaTimes onClick={onClose} className={styles.timesIcon} />
        </div>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal