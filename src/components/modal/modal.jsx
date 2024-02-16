import { createPortal } from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from './modal.module.css'
import { useEffect } from 'react';
import PropTypes from 'prop-types';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const modalRoot = document.getElementById("react-modal");

const Modal = ({ onClose, children }) => {

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
  }, [onClose]);


  return createPortal(
    <>
      <div className={styles.modal}>
        <div className={styles.closeIcon}>
          <CloseIcon type="primary" onClick={() => onClose()} />
        </div>        {children}
      </div>
      <ModalOverlay onClick={() => onClose()} />
    </>,
    modalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;