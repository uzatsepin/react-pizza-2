import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { NotFoundBlock } from './components/NotFoundBlock/NotFoundBlock';
import { Home } from './Pages/Home';
import { Cart } from './Pages/Cart';
import './scss/app.scss';
import { useState } from 'react';

function App() {
  const [searchValue, setSearchValue] = useState('');

  return (  
    <div className="wrapper">
      <Header searchValue={searchValue} setSearchValue={setSearchValue}/>
      <div className="content">
          <Routes>
            <Route path='/' element={<Home searchValue={searchValue}/>}/>
            <Route path='/cart' element={<Cart />}/>
            <Route path='*' element={<NotFoundBlock />}/>
          </Routes>
        </div>
      </div>
  );
}

export default App;
