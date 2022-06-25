export type TSearchPizza = {
  currentPage: string;
  category: string;
  sortBy: string;
  order: string;
  search: string;
};

export type TPizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  size: number[];
  types: number[];
  rating: number;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface IPizzaSlice {
  items: TPizza[];
  status: Status;
}
