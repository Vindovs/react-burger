import { useState, useEffect, FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../modal/modal';
import Order from './order/order';
import BunsConstructor from './buns-constructor';
import IngredientsConstructor from './ingredients-constructor';
import { createOrder } from '../../services/actions';
import { useNavigate } from 'react-router-dom';
import { TIngredient, TRootState } from '../../utils/types';

function BurgerConstructor() {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sum, setSum] = useState(0);
  const openModal = () => {
    setIsModalOpen(true);
  };
  // @ts-ignore}
  const burgerConstructor = useSelector(store => store.burgerConstructor)
  // @ts-ignore
  const user = useSelector(store => store.user.user)

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const burgerBodyAmount = burgerConstructor.body.map((i: TIngredient) => i.price).reduce((sum:number, price:number) => sum + price, 0);
    const defaultBunsAmount = burgerConstructor.bun.length ? 2 * burgerConstructor.bun[0].price : 0;

    setSum(defaultBunsAmount + burgerBodyAmount);
  },
    [burgerConstructor]);

  const dispatch = useDispatch();

  const createOrderHandle = () => {

    if (!user) {
      navigate('/login');
      return;
    }
 // @ts-ignore
    dispatch(createOrder(burgerConstructor));
    openModal();
  }

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
            disabled={!burgerConstructor.bun.length}
            onClick={
              createOrderHandle
            }>Оформить заказ</Button>
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

interface ITotalPrice{
  price: number;
}

const TotalPrice: FC<ITotalPrice>  = ({ price }) => {
  return (
    <div className={'mr-5'} style={{ display: 'flex', alignItems: 'center' }}>
      <p className="text text_type_digits-medium mr-3">{price}</p>
      <CurrencyIcon type='primary'/>
    </div>
  );
}

export default BurgerConstructor;