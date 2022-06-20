import { Route, Routes } from 'react-router-dom';

import { NotFoundBlock } from './components/NotFoundBlock/NotFoundBlock';
import { Home } from './Pages/Home';
import { Cart } from './Pages/Cart';
import './scss/app.scss';
import { FullPizza } from './Pages/FullPizza';
import { MainLayout } from './Layout/MainLayout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFoundBlock />} />
      </Route>
    </Routes>
  );
}

export default App;
