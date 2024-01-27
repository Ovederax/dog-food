import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { usersSlice } from './slices/users-slice';
import { authApi } from './api/authApi';
import { productsApi } from './api/productsApi';
import { favoritesCacheSlice } from './slices/favorites-cache-slice';
import { searchParamsSlice } from './slices/search-params-slice';
import { basketSlice } from './slices/basket-slice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['user', 'basket'],
};

const persistedReducer = persistReducer(
	persistConfig,
	combineReducers({
		[authApi.reducerPath]: authApi.reducer,
		[productsApi.reducerPath]: productsApi.reducer,
		searchParams: searchParamsSlice.reducer,
		user: usersSlice.reducer,
		favoritesCache: favoritesCacheSlice.reducer,
		basket: basketSlice.reducer,
	})
);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(authApi.middleware, productsApi.middleware),
	devTools: true,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
