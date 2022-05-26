import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { NotFoundBlock } from './components/NotFoundBlock/NotFoundBlock';
import { Home } from './Pages/Home';
import { Cart } from './Pages/Cart';
import './scss/app.scss';
import { createContext, useState } from 'react';

export const SearchContext = createContext('');

function App() {

  const [searchValue, setSearchValue] = useState('');
  return (  
    <div className="wrapper">
      <SearchContext.Provider value={{searchValue, setSearchValue}}>
        <Header />
        <div className="content">
            <Routes>
              <Route path='/' element={<Home searchValue={searchValue}/>}/>
              <Route path='/cart' element={<Cart />}/>
              <Route path='*' element={<NotFoundBlock />}/>
            </Routes>
          </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
