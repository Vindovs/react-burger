import { useRef, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredients.module.css';
import Container from './container';
import { useSelector } from 'react-redux';
import { TIngredient } from '../../utils/types';

function BurgerIngredients() {

  const [current, setCurrent] = useState('bun')
  // @ts-ignore
  const { data, dataRequested } = useSelector(store => store.data);

  
  const buns = data.filter((item : TIngredient)  => item.type === 'bun')
  const sauces = data.filter((item : TIngredient)  => item.type === 'sauce')
  const mains = data.filter((item : TIngredient)  => item.type === 'main')

  const tabsRef = useRef<HTMLDivElement>(null);
  const bunsRef = useRef<HTMLDivElement>(null);
  const saucesRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  const setTab = () => {

    const tabBottomCoord = tabsRef.current?.getBoundingClientRect().bottom;
    const bunsTopCoord = bunsRef.current?.getBoundingClientRect().top;
    const saucesTopCoord = saucesRef.current?.getBoundingClientRect().top;
    const mainTopCoord = mainRef.current?.getBoundingClientRect().top;

    if (bunsTopCoord && saucesTopCoord && mainTopCoord && tabBottomCoord) {
      const currentTab = [
        { tab: 'bun', value: Math.abs(bunsTopCoord - tabBottomCoord) },
        { tab: 'sauce', value: Math.abs(saucesTopCoord - tabBottomCoord) },
        { tab: 'main', value: Math.abs(mainTopCoord - tabBottomCoord) }
      ].reduce((a, b) => a.value < b.value ? a : b);
    
      setCurrent(currentTab.tab);
    }
  }

  return (
    <div>{dataRequested && (
      <main style={{ gridArea: 'main', width: '80%' }}>
        <div className="ml-2">
          <h1 style={{ textAlign: 'start' }} className="mt-8 mb-5">Соберите бургер</h1>
          <div >
            <div style={{ display: 'flex' }} className="mb-10" ref={tabsRef}>
              <Tab value="bun" active={current === 'bun'} onClick={setTab}>
                Булки
              </Tab>
              <Tab value="sauce" active={current === 'sauce'} onClick={setTab}>
                Соусы
              </Tab>
              <Tab value="main" active={current === 'main'} onClick={setTab}>
                Начинка
              </Tab>
            </div>
          </div>
          <div className={`${styles.scroll} custom-scroll`} onScroll={() => setTab()}  >
            <div className={styles.container}>
              {<Container ref={bunsRef} ingredients={buns} />}
              {<Container ref={saucesRef} ingredients={sauces} />}
              {<Container ref={mainRef} ingredients={mains} />}
            </div>
          </div>

        </div>
      </main>)}</div>
  );
}


export default BurgerIngredients;