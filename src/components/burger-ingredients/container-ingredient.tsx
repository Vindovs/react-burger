import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from "react-redux";
import { useDrag } from 'react-dnd';
import { DragnDropTypes } from '../../common';
import { Link, useLocation } from 'react-router-dom';
import styles from './burger-ingredients.module.css';
import { FC, MouseEvent } from 'react';
import { TIngredient } from '../../utils/types';

interface IContainerIngredient {
   item: TIngredient
   onClick: (event: MouseEvent<HTMLElement>) => void;

}

const ContainerIngredient : FC<IContainerIngredient>= ({ item, onClick }) => {
  const dispatch = useDispatch();
  const location = useLocation(); // @ts-ignore
  const burgerConstructor = useSelector(store => store.burgerConstructor)
  const { _id, type } = item;

  const count = (type === 'bun') ?
    burgerConstructor.bun.filter((i : TIngredient) => i._id === item._id).length
    :
    burgerConstructor.body.filter((i : TIngredient) => i._id === item._id).length;

  const [{ isDragging }, dragRef] = useDrag({
    type: (type === 'bun') ? DragnDropTypes.BUN : DragnDropTypes.INGREDIENT,
    item: { _id },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const opacity = isDragging ? 0.2 : 1;


  return (
    <Link to={`/ingredients/${item._id}`} state={{ curLocation: location }} className={styles.link} >
      <div ref={dragRef}
        style={{ position: 'sticky', opacity }}
      >
        {!!count && <Counter count={count} size="default" extraClass="m-1" />}
        <img src={item.image} alt={item.name} />
        <div className={'mt-2'}>
          <p className="text text_type_main-medium">{item.price}<CurrencyIcon type='primary'/></p>
        </div>
        <p className={`text text_type_main-default`}>{item.name}</p>
      </div> </Link>);
}



export default ContainerIngredient;