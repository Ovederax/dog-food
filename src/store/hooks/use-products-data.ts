import React, { useCallback, useMemo } from 'react';
import { getSearchParams, getUser } from '../selectors/selectors';
import { useActions, useAppSelector } from './hooks';
import { useGetProductsQuery } from '../api/productsApi';
import { SortType } from '../sort';
import { useThrottle } from '../../hooks/useThrottle';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { ROUTES } from '../../const/routes';

const PAGE_SIZE = 12;

const QUERY_PARAM = 'query';

export const useSearchQuery = () => {
	const [searchParams] = useSearchParams();

	return searchParams.get(QUERY_PARAM) || '';
};

export const useProductsDataHandlers = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const { setPage, setSortType } = useActions();
	const [searchParams, setSearchParams] = useSearchParams();

	const handleChangeSortType = (value: SortType) => {
		setPage(1);
		setSortType(value);
	};

	const handleChangePage = (
		event: React.ChangeEvent<unknown>,
		value: number
	) => {
		setPage(value);
	};

	const handeChangeSearch = (value: string) => {
		if (location.pathname !== ROUTES.catalog) {
			navigate(ROUTES.catalog);
		}
		setSearchParams({ ...searchParams, [QUERY_PARAM]: value });
		setPage(1);
	};

	return { handeChangeSearch, handleChangeSortType, handleChangePage };
};

export const useProductsData = () => {
	const user = useAppSelector(getUser);
	const { sortType, page } = useAppSelector(getSearchParams);
	const { incrementPage } = useActions();
	const [searchParams] = useSearchParams();

	const params = useMemo(() => {
		const query = searchParams.get(QUERY_PARAM) || '';

		return {
			query,
		};
	}, [searchParams]);

	const [throttledParams, inProgress] = useThrottle({
		value: params,
		delay: 1000,
	});

	const requestParams = {
		...throttledParams,
		page,
		limit: PAGE_SIZE,
	};

	const {
		data: dto,
		isLoading,
		isFetching,
		error,
		isError,
		refetch,
	} = useGetProductsQuery(requestParams, {
		skip: !user.userData,
	});

	const isEndOfList =
		dto && (dto.products.length >= dto.total || dto.products.length === 0);

	const loadMoreProducts = useCallback(() => {
		if (!isEndOfList) {
			incrementPage();
		}
	}, [incrementPage, isEndOfList]);

	const { handeChangeSearch, handleChangeSortType, handleChangePage } =
		useProductsDataHandlers();

	const searchValue = searchParams.get(QUERY_PARAM) || '';

	return {
		products: dto?.products || [],
		isError,
		error,
		refetch,
		page,
		totalCount: dto?.total || 0,
		pageCount: Math.ceil((dto?.total || 0) / PAGE_SIZE),
		isLoading: isLoading || inProgress,
		isFetching: isFetching || inProgress,
		handleChangePage,
		sortType,
		handleChangeSortType,
		searchValue,
		handeChangeSearch,
		isEndOfList,
		loadMoreProducts,
	};
};
