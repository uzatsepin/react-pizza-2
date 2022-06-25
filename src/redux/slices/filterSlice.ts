import { RootState } from './../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export enum SortPropertyEnum {
  RATING_DESC = 'rating',
  RATING_ASC = '-rating',
  TITLE_DESC = 'title',
  TITLE_ASC = '-title',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price'
}

type TSort = {
  name: string;
  sortProperty: SortPropertyEnum;
}

interface IinitialState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: TSort
}

const initialState:IinitialState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'популярностю',
    sortProperty: SortPropertyEnum.RATING_DESC,
  }
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchValue(state:IinitialState, action:PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setCategoryId(state:IinitialState, action:PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state:IinitialState, action:PayloadAction<TSort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state:IinitialState,action:PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state:IinitialState, action:PayloadAction<IinitialState>) {
      if(Object.keys(action.payload).length) {
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
    }
  }
})

export const selectFilterSort = (state: RootState) => state.filter.sort;
export const selectFilter = (state: RootState) => state.filter;

export const {setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue} = filterSlice.actions;

export default filterSlice.reducer;