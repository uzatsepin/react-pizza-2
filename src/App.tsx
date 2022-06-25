import { Route, Routes } from 'react-router-dom';
import { Home } from './Pages/Home';
import './scss/app.scss';
import { MainLayout } from './Layout/MainLayout';
import { lazy, Suspense } from 'react';

const Cart = lazy(() =>
  import(/* webpackChunkName: "Cart"*/ './Pages/Cart').then(({ Cart }) => ({ default: Cart })),
);

const FullPizza = lazy(() =>
  import(/* webpackChunkName: "FullPizza"*/ './Pages/FullPizza').then(({ FullPizza }) => ({
    default: FullPizza,
  })),
);
const NotFoundBlock = lazy(() =>
  import(/* webpackChunkName: "NotFound"*/ './components/NotFoundBlock/NotFoundBlock').then(
    ({ NotFoundBlock }) => ({
      default: NotFoundBlock,
    }),
  ),
);

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="cart"
          element={
            <Suspense fallback={<div>Завантаження корзини...</div>}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="pizza/:id"
          element={
            <Suspense fallback={<div>Завантаження сторінки піцци...</div>}>
              <FullPizza />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Завантаження сторінки...</div>}>
              <NotFoundBlock />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
