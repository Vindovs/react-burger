import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import Modal from '../modal/modal';
import Order from './order/order';
import BunsConstructor from './buns-constructor';
import IngredientsConstructor from './ingredients-constructor';
import { createOrder } from '../../services/actions';

function BurgerConstructor() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sum, setSum] = useState(0);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const burgerConstructor = useSelector(store => store.burgerConstructor)

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const burgerBodyAmount = burgerConstructor.body.map(i => i.price).reduce((sum, price) => sum + price, 0);
    const defaultBunsAmount = burgerConstructor.bun.length ? 2 * burgerConstructor.bun[0].price : 0;

    setSum(defaultBunsAmount + burgerBodyAmount);
  },
    [burgerConstructor]);

  const dispatch = useDispatch();

  return (
    <div className={'mt-20 mr-2'}   >
      <div>
        <BunsConstructor>
          <IngredientsConstructor />
        </BunsConstructor>
        <div className={'p-10'} style={{ display: 'flex', alignItems: 'center' }}>
          <TotalPrice price={sum} />
          <Button
            htmlType="button"
            type="primary"
            size="large"
            disabled={ !burgerConstructor.bun.length }
            onClick={() => {
              dispatch (createOrder(burgerConstructor));
              openModal();
            }}>Оформить заказ</Button>
        </div>
        {isModalOpen && (
          <Modal onClose={closeModal}>
            <Order />
          </Modal>
        )}
      </div>
      {isModalOpen && (<Modal onClose={closeModal} ><Order /></Modal>)}
    </div>
  )
}

const TotalPrice = ({ price }) => {
  return (
    <div className={'mr-5'} style={{ display: 'flex', alignItems: 'center' }}>
      <p className="text text_type_digits-medium mr-3">{price}</p>
      <CurrencyIcon />
    </div>
  );
}

export default BurgerConstructor;