import React, { useState } from 'react';
import { CloseIcon,CheckMarkIcon  } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from '../burger-constructor/order/order.module.css'

const Ingridient = ({ingredient}) =>{
    const [isModalOpen, setIsModalOpen] = useState(true);
    const closeModal = () => {
       console.log('closed');
       setIsModalOpen(false);
    };
    return  (
        <>
            {isModalOpen && (<div >
                <div>
                    <div className="pt-10">
                    <div className={styles.closeIcon}>
                        <CloseIcon type="primary" onClick={closeModal} />
                    </div>
                    <p style={{ textAlign: 'start' }} className="text text_type_main-large pl-10">Детали ингридиента</p>
                    </div>
                    <div>
                        <img src={ingredient.image_large} alt={ingredient.name} />
                    </div>
                    <p className="text text_type_main-medium">{ingredient.name}</p>
                </div>
                <div className="text text_type_main-small"  style={{ display: 'inline-flex' }}>
                    <div className={styles.item}>
                        <p>Каллории, калл</p>
                        <p>{ingredient.calories}</p>
                    </div>
                    <div className={styles.item}>
                        <p>Белки, г</p><p>{ingredient.proteins}</p>
                    </div>
                    <div className={styles.item}>
                        <p>Жиры, г</p>
                        <p>{ingredient.fat}</p>
                    </div>
                    <div className={styles.item}>
                        <p>Углеводы г</p>
                        <p>{ingredient.carbohydrates}</p>
                    </div>
                </div>
            </div>)}
        </>        
    );
}
export default Ingridient;