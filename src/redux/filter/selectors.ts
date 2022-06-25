import { RootState } from '../store';

export const selectFilterSort = (state: RootState) => state.filter.sort;
export const selectFilter = (state: RootState) => state.filter;
