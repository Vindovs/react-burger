import React, { useState } from 'react';
import Modal from '../modal/modal'
import Ingridient from './ingridient'
import ContainerIngredient from './container-ingredient'
import { DataType } from '../../utils/types'
import PropTypes from 'prop-types';

const Container =  React.forwardRef(({ ingridients },ref) => {
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
        {ingridients.map(item =>
          <div style={{ position: 'sticky' }}  onClick={() => openModal(item)}>
            <ContainerIngredient key={item._id} item={item} />
          </div>)}
      </div>
      {isModalOpen && (<Modal onClose={closeModal} ><Ingridient ingredient={selectedIngredient} /></Modal>)}
    </div>
  );
})

Container.propTypes = {
  ingridients: PropTypes.arrayOf(DataType)
};

export default Container;