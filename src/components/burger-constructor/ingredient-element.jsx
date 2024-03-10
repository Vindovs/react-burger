import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-constructor.module.css';
import { useState, useRef, useEffect } from 'react';
import {v4  as uuidv4} from 'uuid';
import { useDrag, useDrop } from 'react-dnd';
import { DragnDropTypes } from '../../common';
import {PropTypes} from 'prop-types';
import { DataType } from '../../utils/types';

const IngredientElement = ({ ingredient, index, handleClose, moveIngredient }) => {

    const [constructorId, setId] = useState(null);

    useEffect(() => {
        setId(uuidv4())
    }, []);

    const ref = useRef(null);

    const [{ }, dragRef] = useDrag({
        type: DragnDropTypes.CONSTRUCTOR_INGREDIENT,
        item: { index, constructorId }
    })
    const [{ handlerId, isHover }, dropRef] = useDrop({
        accept: DragnDropTypes.CONSTRUCTOR_INGREDIENT,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
                isHover: monitor.isOver()
            }
        },
        hover(item, monitor) {
            if (!ref.current)
            return;

            const hoverIndex = index;
            const dragIndex = item.index;

            if (hoverIndex === dragIndex)
            return;

            const { top, bottom } = ref.current.getBoundingClientRect();
            const hoverMidPoint = (bottom - top) / 2;
            const cursorY = monitor.getClientOffset().y;
            const dragPointHoverCoordinates = cursorY - top;

            if (dragIndex > hoverIndex && dragPointHoverCoordinates > hoverMidPoint)
            return;

            if (dragIndex < hoverIndex && dragPointHoverCoordinates < hoverMidPoint)
            return;

            moveIngredient(dragIndex, hoverIndex);

            item.index = hoverIndex;
        }
    })


    dropRef(dragRef(ref));

    return (
        <div className={'pt-5'} ref={ref} data-handler-id={handlerId} style={{ display: 'flex', alignItems: 'center' }}>
        <div ><DragIcon /></div>
        <ConstructorElement
            isLocked = {false}
            text = {ingredient.name}
            price ={ingredient.price}
            thumbnail = {ingredient.image}
            handleClose = {() => handleClose(index)}
            extraClass={isHover && style.isHover}
            />
    </div>
    )
}

IngredientElement.propTypes = {
    ingredient: DataType.isRequired,
    index: PropTypes.number.isRequired,
    handleClose: PropTypes.func.isRequired,
    moveIngredient: PropTypes.func.isRequired
}

export default IngredientElement;