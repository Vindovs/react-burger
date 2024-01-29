import React, { useState } from 'react';
import Modal from '../modal/modal'
import Ingridient from './ingridient'
import { DataType } from '../../utils/types'
import styles from './burger-ingridients.module.css';
import PropTypes from 'prop-types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'


const ContainerIngr = ({ ingridients }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  const openModal = (item) => {
    console.log(1);
    setSelectedIngredient(item);
    setIsModalOpen(true);

  };
  const closeModal = () => {
    console.log(isModalOpen);
    setIsModalOpen(false);
  };

  return (
    <>
      {ingridients.map((item, index) => (
        <div className={styles.ingridient} onClick={() => openModal(item)} key={item._id} >
          <img src={item.image} alt={item.name} />
          
          <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="text text_type_main-medium price">{item.price}<CurrencyIcon /></p>
          <p className="text text_type_main-default">{item.name}</p>
        </div>
      ))}
      {isModalOpen && (<Modal onClose={closeModal} ><Ingridient ingredient={selectedIngredient} /></Modal>)}
    </>
  );
};

ContainerIngr.propTypes = {
  ingridients: PropTypes.arrayOf(DataType)
};

export default ContainerIngr;