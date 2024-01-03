import { RootState } from '../store';

export const getUser = (state: RootState) => state.user;

export const getProducts = (state: RootState) => state.products;

export const getProduct = (state: RootState) => state.product;
