import React, { useState } from 'react';
import { ConstructorElement, CurrencyIcon, Button,CheckMarkIcon  } from '@ya.praktikum/react-developer-burger-ui-components'
import  data  from '../../utils/data'
import styles from './burger-constructor.module.css';
import Modal from '../modal/modal';
import Order from './order/order';

function BurgerConstructor() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    console.log(1);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log(2);
    setIsModalOpen(false);
  };

    return (
      <div  className={`mt-20 mr-2`}   >
           <div className={`${styles.scroll} custom-scroll`} style={{gridArea:'sidebar', display: 'flex', flexDirection: 'column', gap: '10px',width: '110%'}}>
            {data.map((item) =>
                <ConstructorElement
                key={item.key}
                    isLocked = {false}
                    text = {item.name}
                    price ={item.price}
                    thumbnail = {item.image}
              />)}
              </div>  
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="mt-10 ">
              <div className="mr-10 " style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <p style={{ fontSize: '60px' }} className="text text_type_digits-default ">789</p>
                <CurrencyIcon  type="primary"/>  
                </div>          
              <Button htmlType="button" type="primary" size="large" onClick={openModal} >
                Оформить заказ
              </Button>
              </div>
             {isModalOpen && (<Modal onClose={closeModal} ><Order/></Modal>)}
        </div>
      )
  }

export default BurgerConstructor;