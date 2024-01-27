import { createPortal } from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from './modal.module.css'
import React, { useEffect } from 'react';

const modalRoot = document.getElementById("react-modal");

const Modal = ({onClose, children}) =>{

const handleEsc = (event) => {
        if (event.key === 'Escape') {
          onClose();
        }
};
useEffect(() => {
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  });

    return createPortal (
        (
            <ModalOverlay 
            onClick ={()=>{onClose()}}>
                
                <div className={styles.modal}>{children}</div>                
                                    
            </ModalOverlay>
        ), modalRoot
    );
}

export default Modal;