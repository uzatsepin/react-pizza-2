/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { PizzaBlock } from '../components/PizzaBlock/PizzaBlock';
import { Sort } from '../components/Sort/Sort';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import { Categories } from '../components/Categories/Categories';
import { Pagination } from '../components/Pagination/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilter, setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import { useCallback } from 'react';
import { fetchPizzas, selectPizza } from '../redux/slices/pizzaSlice';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizza);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const onChangeCategory = useCallback((idx: number) => {
    dispatch(setCategoryId(idx));
  }, []);

  const getPizzas = async () => {
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `search=${searchValue}` : '';

    dispatch(
      //@ts-ignore
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage,
      }),
    );
  };

  // Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    getPizzas();
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const pizza = items.map((pizza: any) => (
    <Link key={pizza.id} to={`/pizza/${pizza.id}`}>
      <PizzaBlock {...pizza} />
    </Link>
  ));
  const skeleton = [...new Array(8)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="cart cart--empty">
          <h2>Виникла помилка</h2>
          <p>На жаль, не вдалося завантажити піцци.</p>
          <p>Спробуйте перезавантажити сторінку.</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeleton : pizza}</div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};