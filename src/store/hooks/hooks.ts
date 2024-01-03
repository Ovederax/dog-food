import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { fetchMe, updateMe, updateMeAvatar } from '../slices/users-slice';
import {
	addReview,
	deleteReview,
	getProductById,
	getReviewByProduct,
} from '../slices/products-details-slice';
import {
	addToFavorites,
	deleteFromFavorites,
	getAllProducts,
} from '../slices/products-slice';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;

const rootActions = {
	fetchMe,
	updateMe,
	updateMeAvatar,
	//
	getAllProducts,
	//
	addToFavorites,
	deleteFromFavorites,
	//
	getProductById,
	addReview,
	getReviewByProduct,
	deleteReview,
};

export const useActions = () => {
	const dispatch = useAppDispatch();

	return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};
