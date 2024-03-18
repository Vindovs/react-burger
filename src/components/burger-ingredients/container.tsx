import React, { useState } from 'react';
import Modal from '../modal/modal'
import Ingredient from './ingredient'
import ContainerIngredient from './container-ingredient'
import { TIngredient } from '../../utils/types';

interface IContainerProps {
  ingredients: TIngredient[];
}
const Container = React.forwardRef<HTMLDivElement, IContainerProps>(({ ingredients }, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState<TIngredient | null>(null);

  const openModal = (item : TIngredient) => {
    setSelectedIngredient(item);
    setIsModalOpen(true);

  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div ref={ref}>
      <div >
        {ingredients.map(item =>
          <ContainerIngredient key={item._id} item={item} onClick={() => openModal(item)} />
        )}
      </div>
      {isModalOpen && selectedIngredient && (<Modal onClose={closeModal} ><Ingredient /></Modal>)}
    </div>
  );
})


export default Container;