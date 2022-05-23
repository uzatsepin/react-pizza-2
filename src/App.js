import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import { NotFoundBlock } from './components/NotFoundBlock/NotFoundBlock';
import { Home } from './Pages/Home';
import {Cart} from './Pages/Cart';
import './scss/app.scss';

function App() {

  return (  
    <div className="wrapper">
      <Header/>
      <div className="content">
        <div className="container">
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/cart' element={<Cart />}/>
            <Route path='*' element={<NotFoundBlock />}/>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
