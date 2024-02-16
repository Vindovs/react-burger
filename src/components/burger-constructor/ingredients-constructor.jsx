import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { DragnDropTypes } from '../../common';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import {ADD_INGREDIENT, DELETE_INGREDIENT, RESET_INGREDIENT} from '../../services/actions/index';
import IngredientElement from './ingredient-element.jsx'
import { useCallback, useEffect } from 'react'
import {v4  as uuidv4} from 'uuid';
import styles from './burger-constructor.module.css';

const IngredientsConstructor = () => {
    const body = useSelector(store => store.burgerConstructor.body);
    const ingredients = useSelector(store => store.data.data);

    const dispatch = useDispatch();

    const [{ isOver }, dropRef] = useDrop({
        accept: DragnDropTypes.INGREDIENT,
        drop(item) {
            console.log(ingredients.find(i => i._id === item._id));
            dispatch({
                type: ADD_INGREDIENT,
                payload: {
                    ...ingredients.find(i => i._id === item._id),
                    idUniq: uuidv4()
                }
            });
        },
        collect: monitor => ({
            isOver: monitor.isOver()
        })
    });
    
    const deleteIngredient = useCallback((index) => {
        dispatch({
            type: DELETE_INGREDIENT,
            index: index
            })
        }, []);

    const handleDragItem = useCallback((dragIndex, hoverIndex) => {
        const newBody = [...body];

        const value = newBody[dragIndex];

        newBody[dragIndex] = newBody[hoverIndex];
        newBody[hoverIndex] = value;

        dispatch({
            type: RESET_INGREDIENT,
            payload: newBody
        });

    }, [body]);

    const renderItem = useCallback((item, index) => {
        const { idUniq, ...ingredient} = item;
        return (<div >
            <IngredientElement key={idUniq}
                ingredient={ingredient}
                index={index}
                handleClose={deleteIngredient}
                moveIngredient={handleDragItem} /></div>
        )
    }, [body])
   
// Прячем изображения без src ¯\_(ツ)_/¯
    useEffect(() => {
        const images = document.querySelectorAll('img.constructor-element__image');
        images.forEach(img => {
            if (img.getAttribute('src') === '') {
                img.style.zIndex = '-1';
            }
            img.addEventListener('load', () => {
                img.style.zIndex = '';
            });
        });
    }, []);

    return (
    <div className={`${styles.scroll} custom-scroll p-5`}  ref={dropRef} >
        {body.length !== 0 ? (
            body.map((item, index) => {
                return (renderItem(item, index))
            }
            )) : (
                <ConstructorElement text={'Выберите начинку'} thumbnail={''}/>
            )}
    </div>);
}

export default IngredientsConstructor;