import {
	createSlice,
	ActionReducerMapBuilder,
	SerializedError,
	PayloadAction,
} from '@reduxjs/toolkit';
import { api } from '../api/api';
import {
	GetProductsParams,
	Product,
	ProductsDto,
	UpdateProductParams,
} from '../api/types';
import { noop } from '../../utils/noop';
import {
	createAppAsyncThunk,
	createErrorWrapAsyncThunk,
} from '../createAppAsyncThunk';
import { isActionFulfilled, isActionPending, isActionRejected } from './utils';

const sliceName = 'products';

export const getAllProducts = createAppAsyncThunk<
	ProductsDto,
	GetProductsParams
>(`${sliceName}/getAll`, async ({ page, limit, query }: GetProductsParams) =>
	api.products.getAll(page, limit, query)
);

export const createProduct = createErrorWrapAsyncThunk(
	`${sliceName}/create`,
	api.products.create
);

export const getFilteredProducts = createErrorWrapAsyncThunk(
	`${sliceName}/getFiltered`,
	api.products.getFiltered
);

export const updateProduct = createErrorWrapAsyncThunk(
	`${sliceName}/update`,
	({ productId, body }: UpdateProductParams) =>
		api.products.update(productId, body)
);

export const deleteProduct = createErrorWrapAsyncThunk(
	`${sliceName}/delete`,
	api.products.delete
);

export const getAllReview = createErrorWrapAsyncThunk(
	`${sliceName}/getAllReview`,
	api.products.getAllReview
);

export const addToFavorites = createErrorWrapAsyncThunk(
	`${sliceName}/addToFavorites`,
	api.products.addToFavorites
);

export const deleteFromFavorites = createErrorWrapAsyncThunk(
	`${sliceName}/deleteFromFavorites`,
	api.products.deleteFromFavorites
);

interface State {
	loading: boolean;
	error: SerializedError | null | unknown;
	products: ProductsDto | null;
}

const initialState: State = {
	loading: false,
	error: null,
	products: null,
};

export const productsSlice = createSlice({
	name: sliceName,
	initialState,
	reducers: {
		noop,
	},
	extraReducers: (builder: ActionReducerMapBuilder<State>) => {
		builder
			.addMatcher(isActionFulfilled(`${sliceName}/getAll`), (state, action) => {
				state.loading = false;
				state.products = action.payload;
			})
			.addMatcher(isActionPending(`${sliceName}/getAll`), (state) => {
				state.loading = true;
				state.error = null;
			})
			.addMatcher(isActionRejected(`${sliceName}/`), (state, action) => {
				state.error = action.payload;
				state.loading = false;
			})
			.addMatcher(
				isActionFulfilled(`${sliceName}/addToFavorites`),
				(state, action: PayloadAction<Product>) => {
					const result = action.payload;
					if (state.products) {
						state.products.products = state.products.products.map((it) =>
							it._id === result._id ? result : it
						);
					}
					state.loading = false;
				}
			)
			.addMatcher(
				isActionFulfilled(`${sliceName}/deleteFromFavorites`),
				(state, action: PayloadAction<Product>) => {
					const result = action.payload;
					if (state.products) {
						state.products.products = state.products.products.map((it) =>
							it._id === result._id ? result : it
						);
					}
					state.loading = false;
				}
			);
	},
});
