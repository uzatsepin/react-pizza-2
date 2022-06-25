import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { IPizzaSlice, Status, TPizza, TSearchPizza } from './types';

export const fetchPizzas = createAsyncThunk<TPizza[], TSearchPizza>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { currentPage, category, sortBy, order, search } = params;
    const { data } = await axios.get<TPizza[]>(
      `https://628b53477886bbbb37b5ad90.mockapi.io/pizzas?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}&${search}`,
    );
    return data;
  },
);

const initialState: IPizzaSlice = {
  items: [],
  status: Status.LOADING, // loading | success | error
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state: IPizzaSlice, action: PayloadAction<TPizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
