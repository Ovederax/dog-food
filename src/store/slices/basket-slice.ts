import { Product } from '../api/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const sliceName = 'basket';

export interface BasketItem {
	product: Product;
	count: number;
}

interface State {
	items: BasketItem[];
}

const initialState: State = {
	items: [],
};

export const basketSlice = createSlice({
	name: sliceName,
	initialState,
	reducers: {
		addBasketItem: (state, action: PayloadAction<BasketItem>) => {
			const itemIndex = state.items.findIndex(
				(it) => it.product._id === action.payload.product._id
			);
			if (itemIndex !== -1) {
				state.items = state.items.map((it) => {
					if (it.product._id === action.payload.product._id) {
						return action.payload;
					}
					return it;
				});
			} else {
				state.items.push(action.payload);
			}
		},
		removeFromBasket: (state, action: PayloadAction<string>) => {
			state.items = state.items.filter(
				(it) => it.product._id !== action.payload
			);
		},
	},
});

export const { addBasketItem, removeFromBasket } = basketSlice.actions;
