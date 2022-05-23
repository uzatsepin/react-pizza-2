import { useEffect, useState } from 'react';
import Categories from './components/Categories/Categories';
import Header from './components/Header/Header';
import PizzaBlock from './components/PizzaBlock/PizzaBlock';
import Sort from './components/Sort/Sort';
import './scss/app.scss';
// import pizzas from './pizzas.json';

function App() {

  const [pizzas, setPizzas] = useState([])

  useEffect(() => {
    fetch('https://628b53477886bbbb37b5ad90.mockapi.io/pizzas')
    .then((res) => res.json())
    .then((data) => setPizzas(data))
  }, [])

  return (  
    <div className="wrapper">
      <Header/>
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {
              pizzas.map((pizza) => (
                <PizzaBlock key={pizza.id} {...pizza}/>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
