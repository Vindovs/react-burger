import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { DragnDropTypes }  from '../../common'
import {SET_BUNS_CONSTRUCTOR} from '../../services/actions/index';

const BunsConstructor = ({children}) => {
    const burgerBun = useSelector(store => store.burgerConstructor.bun);
    const ingredients = useSelector(store => store.data.data);
    

    const dispatch = useDispatch();

    const [{isOver},dropRef] = useDrop({
        accept: DragnDropTypes.BUN,
        drop(item){
            dispatch({
                type: SET_BUNS_CONSTRUCTOR,
                payload: ingredients.find(i => i._id === item._id)
            });
         },
        collect: monitor => ({
            isOver: monitor.isOver()
        })
    });

    return (
        <div ref={dropRef}>
         {burgerBun.length !== 0 ? (
         <ConstructorElement
                    type='top'
                    isLocked = {true}
                    text = {burgerBun[0].name + '(верх)'}
                    price ={burgerBun[0].price}
                    thumbnail = {burgerBun[0].image}
              />
              ):(
                <ConstructorElement
                    type= 'top'
                    isLocked = {true}
                    text = {'Выберите булку'}
                    thumbnail = {''}
                    />
            )}
            {children}
            {burgerBun.length !==0 ? (
              <ConstructorElement
                    type='bottom'
                    isLocked = {true}
                    text = {burgerBun[0].name + '(низ)'}
                    price ={burgerBun[0].price}
                    thumbnail = {burgerBun[0].image}
              />):(
                    <ConstructorElement
                        type= 'bottom'
                        isLocked = {true}
                        text = {'Выберите булку'}
                        thumbnail={''}
                        />
                )}
        </div>
    );
}

export default BunsConstructor;