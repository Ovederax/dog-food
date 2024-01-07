import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { usersSlice } from './slices/users-slice';
import { authApi } from './api/authApi';
import { productsApi } from './api/productsApi';
import { favoritesCacheSlice } from './slices/favorites-cache-slice';
import { searchParamsSlice } from './slices/search-params-slice';

export const store = configureStore({
	reducer: combineReducers({
		[authApi.reducerPath]: authApi.reducer,
		[productsApi.reducerPath]: productsApi.reducer,
		searchParams: searchParamsSlice.reducer,
		user: usersSlice.reducer,
		favoritesCache: favoritesCacheSlice.reducer,
	}),
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(authApi.middleware, productsApi.middleware),
	devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
