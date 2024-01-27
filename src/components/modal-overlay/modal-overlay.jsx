
import styles from './modal-overlay.module.css'

const ModalOverlay = ({children, onClick}) => {
    return(
        <div className={styles.modaloverlay} onClick={e=>{
            e.stopPropagation();
            onClick();
        }}>
            {children}
        </div>
    )
}
export default ModalOverlay