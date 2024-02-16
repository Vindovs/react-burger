import { useRef, useState} from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import Container from './container';
import { DataType } from '../../utils/types'
import { useSelector } from 'react-redux';

function BurgerIngredients() {

  const [current, setCurrent] = useState('bun')
  const {data, dataRequested} = useSelector(store => store.data);

  const buns = data.filter(item => item.type === 'bun')
  const sauces = data.filter(item => item.type === 'sauce')
  const mains = data.filter(item => item.type === 'main')

  const tabsRef = useRef(null);
  const bunsRef = useRef(null);
  const saucesRef = useRef(null);
  const mainRef = useRef(null); 

  const setTab = () => {

    const tabBottomCoord = tabsRef.current.getBoundingClientRect().bottom;
    const bunsTopCoord = bunsRef.current.getBoundingClientRect().top;
    const saucesTopCoord = saucesRef.current.getBoundingClientRect().top;
    const mainTopCoord = mainRef.current.getBoundingClientRect().top;

    const currentTab = [{ tab: 'bun', value: Math.abs(bunsTopCoord - tabBottomCoord) },
    { tab: 'sauce', value: Math.abs(saucesTopCoord - tabBottomCoord) },
    { tab: 'main', value: Math.abs(mainTopCoord - tabBottomCoord) }].reduce((a, b) => a.value < b.value ? a : b)
    setCurrent(currentTab.tab);
}

  return (
    <div>{ dataRequested && (
    <main style={{ gridArea: 'main', width: '75%' }}>
      <div className="ml-2">
        <h1 style={{ textAlign: 'start' }} className="mt-8 mb-5">Соберите бургер</h1>
        <div >
          <div style={{ display: 'flex' }} className="mb-10" ref={tabsRef}>
            <Tab value="bun" active={current === 'bun'}>
              Булки
            </Tab>
            <Tab value="sauce" active={current === 'sauce'}>
              Соусы
            </Tab>
            <Tab value="main" active={current === 'main'}>
              Начинка
            </Tab>
          </div>
        </div>
        <div className={`${styles.scroll} custom-scroll`} onScroll={() => setTab()}  >
          <div className={styles.container}>
            {<Container ref={bunsRef} ingredients={buns} />}
            {<Container  ref={saucesRef} ingredients={sauces} />}
            {<Container ref={mainRef}  ingredients={mains} />}
          </div>
        </div>

      </div>
    </main>)}</div>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(DataType)
};

export default BurgerIngredients;