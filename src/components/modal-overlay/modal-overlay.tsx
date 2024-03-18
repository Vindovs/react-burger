import styles from './modal-overlay.module.css'
import { FC } from 'react';

interface IModalOverlay {
    onClick: () => void;
    children? : React.ReactNode;
}

const ModalOverlay : FC<IModalOverlay> = ({ children, onClick }) => {
    return (
        <div className={styles.modaloverlay} onClick={e => {
            e.stopPropagation();
            onClick();
        }}>
            {children}
        </div>
    )
};


export default ModalOverlay