import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import filter from './filter/slices';
import cart from './cart/slices';
import pizza from './pizza/slices';

export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizza,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
