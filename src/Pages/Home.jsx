/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useRef } from 'react';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PizzaBlock } from '../components/PizzaBlock/PizzaBlock';
import { Sort } from '../components/Sort/Sort';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import { Categories } from '../components/Categories/Categories';
import { Pagination } from '../components/Pagination/Pagination';
import { SearchContext } from '../App';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { sortList } from '../components/Sort/Sort';
import { useCallback } from 'react';

export const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
  const sortType = sort.sortProperty;
  const navigate = useNavigate();
  const { searchValue } = useContext(SearchContext);

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const onChangeCategory = useCallback((idx) => {
    dispatch(setCategoryId(idx));
  }, []);

  const fetchPizzas = () => {
    const sortyBy = sortType.replace('-', '');
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    setIsLoading(true);
    axios
      .get(
        `https://628b53477886bbbb37b5ad90.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortyBy}&order=${order}${search}`,
      )
      .then((res) => {
        setPizzas(res.data);
        setIsLoading(false);
      });
  };
  // Если изменили параметры и был первый рендер !
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, currentPage]);

  //Если был первый рендер, то проверяем URL параметры и сохраняем в Redux !
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  // Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizza = pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);
  const skeleton = [...new Array(8)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeleton : pizza}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
