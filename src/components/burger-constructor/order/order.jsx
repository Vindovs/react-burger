import { CloseIcon,CheckMarkIcon  } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './order.module.css'

const Order = () =>{ 

    return  (
        <>
              <div className={styles.order} >
                <div>
                <p className="text text_type_digits-large mt-30">034536</p>
                <p className="text text_type_main-medium mt-8 mb-15">идентификатор заказа</p>
                <CheckMarkIcon type="primary" />
                <p className="text text_type_main-default mt-12  mb-2">Ваш заказ начали готовить</p>
                <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбатальной станции</p>
                </div>
            </div>
        </>        
    );
}
export default Order;