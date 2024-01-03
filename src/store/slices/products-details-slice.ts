import { createErrorWrapAsyncThunk } from '../createAppAsyncThunk';
import { api } from '../api/api';
import {
	ActionReducerMapBuilder,
	createSlice,
	SerializedError,
} from '@reduxjs/toolkit';
import { noop } from '../../utils/noop';
import { isActionFulfilled, isActionPending, isActionRejected } from './utils';
import { DeleteReviewParams, Product, ReviewCreateDto } from '../api/types';

const sliceName = 'product';

export const getProductById = createErrorWrapAsyncThunk(
	`${sliceName}/getById`,
	api.products.getById
);

export const addReview = createErrorWrapAsyncThunk(
	`${sliceName}/addReview`,
	({ productId, dto }: { productId: string; dto: ReviewCreateDto }) =>
		api.products.addReview(productId, dto)
);

export const getReviewByProduct = createErrorWrapAsyncThunk(
	`${sliceName}/getReviewByProduct`,
	api.products.getReviewByProduct
);

export const deleteReview = createErrorWrapAsyncThunk(
	`${sliceName}/deleteReview`,
	({ productId, reviewId }: DeleteReviewParams) =>
		api.products.deleteReview(productId, reviewId)
);

interface State {
	loading: boolean;
	error: SerializedError | null | unknown;
	product: Product | null;
}

const initialState: State = {
	loading: false,
	error: null,
	product: null,
};

export const productSlice = createSlice({
	name: sliceName,
	initialState,
	reducers: {
		noop,
	},
	extraReducers: (builder: ActionReducerMapBuilder<State>) => {
		builder
			.addMatcher(isActionFulfilled(`${sliceName}/`), (state, action) => {
				state.loading = false;
				state.product = action.payload;
			})
			.addMatcher(isActionPending(`${sliceName}/`), (state) => {
				state.loading = true;
				state.error = null;
			})
			.addMatcher(isActionRejected(`${sliceName}/`), (state, action) => {
				state.error = action.payload;
				state.loading = false;
			});
	},
});
