import React, { useState } from 'react';
import Modal from '../modal/modal'
import Ingridient from './ingridient'

const ContainerIngr = ({ingridients}) => {

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
            <div onClick={()=>openModal(item)} key={item._id} style={{ cursor: 'pointer',flexBasis: 'calc(45% - 28px)', border: '1px solid #ccc', margin: '5px', background: '#282c34' }}>
              <img src={item.image} alt={item.name} style={{ maxWidth: '90px', maxHeight: '90px' }} />
              <p>{item.name}</p>
              <p>Price: {item.price}</p>
            </div>
          ))}
          {isModalOpen && (<Modal onClose={closeModal} ><Ingridient ingredient={selectedIngredient}/></Modal>)}

      </>    )}
export default ContainerIngr;