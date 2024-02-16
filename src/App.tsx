import React from 'react';
import './App.css';
import Header from './components/header/header'
import BurgerIngredients from './components/burger-ingridients/burger-ingridients'
import BurgerConstructor from './components/burger-constructor/burger-constructor'

function App() {

  const [data, setData] = React.useState([]);

  const dataFetch = () => {
    fetch('https://norma.nomoreparties.space/api/ingredients')
      .then(res => {
        if (res.ok) { return res.json(); }
        throw new Error('Error');
      })
      .then(data => {
        setData(data.data);
        console.log(data.data)
      })
      .catch(e => { console.log('Error:' + e.message); })
  };


  React.useEffect(() => {dataFetch()

  }, []);

  return (
    <main className="App container">
      <Header />
      <BurgerIngredients data={data} />
      <BurgerConstructor />
    </main>
  );
}

export default App;
