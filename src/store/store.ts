import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { usersSlice } from './slices/users-slice';
import { productsSlice } from './slices/products-slice';
import { productSlice } from './slices/products-details-slice';

export const store = configureStore({
	reducer: combineReducers({
		user: usersSlice.reducer,
		products: productsSlice.reducer,
		product: productSlice.reducer,
	}),
	devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
