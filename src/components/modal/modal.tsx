import { createPortal } from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from './modal.module.css'
import {  FC, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { TIngredient } from '../../utils/types';

interface IModal{
  onClose: () => void;
  children?: React.ReactNode;
}

const modalRoot = document.getElementById("react-modal") as Element;

const Modal: FC<IModal> = ({ onClose, children }) => {

  const handleEsc = (event : KeyboardEvent) => {
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

export default Modal;