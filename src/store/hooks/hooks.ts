import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { clearUser, setTokens, setUser } from '../slices/users-slice';
import {
	addToFavorites,
	removeFromFavorite,
} from '../slices/favorites-cache-slice';
import {
	incrementPage,
	setPage,
	setSortType,
} from '../slices/search-params-slice';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;

const rootActions = {
	setTokens,
	setUser,
	clearUser,
	//
	addToFavorites,
	removeFromFavorite,
	//
	setPage,
	incrementPage,
	setSortType,
};

export const useActions = () => {
	const dispatch = useAppDispatch();

	return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};
