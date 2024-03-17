import React, { useState } from 'react';
import Modal from '../modal/modal'
import Ingredient from './ingredient'
import ContainerIngredient from './container-ingredient'
import { DataType } from '../../utils/types'
import PropTypes from 'prop-types';

const Container = React.forwardRef(({ ingredients }, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  const openModal = (item) => {
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
      {isModalOpen && (<Modal onClose={closeModal} ><Ingredient ingredient={selectedIngredient} /></Modal>)}
    </div>
  );
})

Container.propTypes = {
  ingredients: PropTypes.arrayOf(DataType)
};

export default Container;