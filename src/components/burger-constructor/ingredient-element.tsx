import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-constructor.module.css';
import { useState, useRef, useEffect, FC } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDrag, useDrop } from 'react-dnd';
import { DragnDropTypes } from '../../common';
import { TIngredient } from '../../utils/types';
import { Identifier } from 'typescript';

interface IDraggingItem {
    id: string
    index: number
    type: string
}

interface IIngredientElement {
    ingredient: TIngredient;
    index: number;
    handleClose: (index: number) => void;
    moveIngredient: (dragIndex: number, hoverIndex: number) => void
}

const IngredientElement: FC<IIngredientElement> = ({ ingredient, index, handleClose, moveIngredient }) => {

    const [constructorId, setId] = useState(null);
    // @ts-ignore
    useEffect(() => { setId(uuidv4()) }, []);

    const ref = useRef(null);

    const [, dragRef] = useDrag({
        type: DragnDropTypes.CONSTRUCTOR_INGREDIENT,
        item: { index, constructorId }
    })
    const [{ handlerId, isHover }, dropRef] = useDrop<IDraggingItem, unknown, { handlerId: Identifier | null, isHover: boolean }>({
        accept: DragnDropTypes.CONSTRUCTOR_INGREDIENT,
        collect(monitor: any) {
            return {
                handlerId: monitor.getHandlerId(),
                isHover: monitor.isOver()
            }
        },
        hover(item: IDraggingItem, monitor) {
            if (!ref.current)
                return;

            const hoverIndex: number = index;
            const dragIndex: number = item.index;

            if (hoverIndex === dragIndex)
                return;
            // @ts-ignore
            const { top, bottom } = ref.current.getBoundingClientRect();
            const hoverMidPoint = (bottom - top) / 2;
            // @ts-ignore
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
            <div ><DragIcon type='primary' /></div>
            <ConstructorElement
                isLocked={false}
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                handleClose={() => handleClose(index)}
                extraClass={isHover ? style.isHover : ' '}
            />
        </div>
    )
}


export default IngredientElement;