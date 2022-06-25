import { RootState } from './../store';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk<TPizza[], TSearchPizza>('pizza/fetchPizzasStatus', async (params) => {
  const { currentPage, category, sortBy, order, search } = params;
  const { data } = await axios.get<TPizza[]>(
    `https://628b53477886bbbb37b5ad90.mockapi.io/pizzas?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}&${search}`,
  );
  return data;
});

export type TSearchPizza = {
  currentPage: string;
  category: string; 
  sortBy: string; 
  order: string; 
  search: string;

}

type TPizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  size: number[];
  types: number[];
  rating: number;
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

interface IPizzaSlice {
  items: TPizza[];
  status: Status;
}

const initialState:IPizzaSlice = {
  items: [],
  status: Status.LOADING // loading | success | error
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state:IPizzaSlice, action:PayloadAction<TPizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    })
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    })
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    })
  }
});

export const selectPizza = (state:RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
