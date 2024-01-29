import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
import styles from './burger-ingridients.module.css';
import ContainerIngr from './container-ingr';
import { DataType } from '../../utils/types'

function BurgerIngredients({ data }) {

  const [current, setCurrent] = React.useState('bun')

  const buns = data.filter(item => item.type === 'bun')
  const sauces = data.filter(item => item.type === 'sauce')
  const mains = data.filter(item => item.type === 'main')
  const filteredData = data.filter(item => item.type === current)
  console.log('filteredData :', filteredData)
  return (
    <main style={{ gridArea: 'main', width: '75%' }}>
      <div className="ml-2">
        <h1 style={{ textAlign: 'start' }} className="mt-8 mb-5">Соберите бургер</h1>
        <div >
          <div style={{ display: 'flex' }} className="mb-10">
            <Tab value="bun" active={current === 'bun'} onClick={() => setCurrent('bun')}>
              Булки
            </Tab>
            <Tab value="sauce" active={current === 'sauce'} onClick={() => setCurrent('sauce')}>
              Соусы
            </Tab>
            <Tab value="main" active={current === 'main'} onClick={() => setCurrent('main')}>
              Начинка
            </Tab>
          </div>
        </div>
        <div className={`${styles.scroll} custom-scroll`}   >
          <div className={styles.container}>
            {<ContainerIngr ingridients={buns} />}
            {<ContainerIngr ingridients={sauces} />}
            {<ContainerIngr ingridients={mains} />}
          </div>
        </div>

      </div>
    </main>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(DataType)
};

export default BurgerIngredients;