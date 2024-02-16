import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from "react-redux";
import {SET_INGREDIENT} from '../../services/actions';
import { useDrag } from 'react-dnd';
import {DragnDropTypes} from '../../common';

const ContainerIngredient = ({ item }) => {
  const dispatch = useDispatch();

  const burgerConstructor = useSelector(store => store.burgerConstructor)
  const {_id, type} = item;

  const count = (type === 'bun') ?
    burgerConstructor.bun.filter(i => i._id === item._id).length 
    :
    burgerConstructor.body.filter(i => i._id === item._id).length;



  const [{ isDragging }, dragRef] = useDrag({
    type: (type === 'bun') ? DragnDropTypes.BUN : DragnDropTypes.INGREDIENT,
    item: { _id },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });
  
  const opacity = isDragging ? 0.2 : 1;

  const setModalItem = () => {
    dispatch({
      type: SET_INGREDIENT,
      payload: item
    });
  
  }

  return (
    <div ref={dragRef}
      onClick={setModalItem}
      style={{ opacity }}
    >
      {!!count && <Counter count={count} size="default" extraClass="m-1" />}
      <img src={item.image} alt={item.name} />
      <div className={'mt-2'}>
        <p className="text text_type_main-medium">{item.price}<CurrencyIcon /></p>
      </div>
      <p className={`text text_type_main-default`}>{item.name}</p>
    </div>);
}



export default ContainerIngredient;