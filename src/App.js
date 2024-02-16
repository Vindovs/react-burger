
import './App.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'
import Header from './components/header/header'
import BurgerIngredients from './components/burger-ingredients/burger-ingredients'
import BurgerConstructor from './components/burger-constructor/burger-constructor'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { dataFetch } from './services/actions/index';
function App() {

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(dataFetch());
  }, [] )

  return (
    <main className="App container">
       <DndProvider backend={HTML5Backend}>
      <Header />
      <BurgerIngredients />
      <BurgerConstructor />
      </DndProvider>
    </main>
  );
}

export default App;
