import { RootState } from '../store';

export const getUser = (state: RootState) => state.user;

export const getUserId = (state: RootState) => state.user.userData?._id;

export const getFavoritesCache = (state: RootState) =>
	state.favoritesCache.favorites;

export const getProduct = (state: RootState) => state.product;

export const getAccessToken = (state: RootState) => state.user.accessToken;

export const getSearchParams = (state: RootState) => state.searchParams;
