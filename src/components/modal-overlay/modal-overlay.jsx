import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css'

const ModalOverlay = ({ children, onClick }) => {
    return (
        <div className={styles.modaloverlay} onClick={e => {
            e.stopPropagation();
            onClick();
        }}>
            {children}
        </div>
    )
};

ModalOverlay.propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func.isRequired,
};


export default ModalOverlay