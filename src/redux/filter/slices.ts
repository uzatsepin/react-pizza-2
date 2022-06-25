import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IinitialState, SortPropertyEnum, TSort } from './types';

const initialState: IinitialState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'популярностю',
    sortProperty: SortPropertyEnum.RATING_DESC,
  },
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchValue(state: IinitialState, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setCategoryId(state: IinitialState, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state: IinitialState, action: PayloadAction<TSort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state: IinitialState, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state: IinitialState, action: PayloadAction<IinitialState>) {
      if (Object.keys(action.payload).length) {
        state.currentPage = Number(action.payload.currentPage);
        state.categoryId = Number(action.payload.categoryId);
        state.sort = action.payload.sort;
      } else {
        state.currentPage = 1;
        state.categoryId = 0;
        state.sort = {
          name: 'популярністю',
          sortProperty: SortPropertyEnum.RATING_DESC,
        };
      }
    },
  },
});

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
