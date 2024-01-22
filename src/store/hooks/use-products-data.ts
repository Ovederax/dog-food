import { useState } from 'react';
import { getUser } from '../selectors/selectors';
import { useAppSelector } from './hooks';
import { useGetProductsQuery } from '../api/productsApi';
import { useSearchParams } from 'react-router-dom';
import { SortType } from '../sort';

const PAGE_SIZE = 12;

export const useProductsData = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const page = Number(searchParams.get('page')) || 1;
	const query = searchParams.get('query') || '';

	const [sortType, setSortType] = useState<SortType>(SortType.Popular);

	const user = useAppSelector(getUser);

	const requestParams = {
		limit: PAGE_SIZE,
		page,
		query: query,
	};

	const {
		data: dto,
		isLoading,
		error,
		isError,
		refetch,
	} = useGetProductsQuery(requestParams, {
		skip: !user.userData,
	});

	const handleChangePage = (
		event: React.ChangeEvent<unknown>,
		value: number
	) => {
		setSearchParams({ ...searchParams, page: String(value) });
	};

	const handleChangeSortType = (value: SortType) => {
		setSearchParams({ ...searchParams, page: '1' });
		setSortType(value);
	};

	const handeChangeSearch = (value: string) => {
		setSearchParams({ ...searchParams, page: '1', query: value });
	};

	return {
		products: dto?.products || [],
		isError,
		error,
		refetch,
		page,
		pageCount: Math.ceil((dto?.total || 0) / PAGE_SIZE),
		loading: isLoading,
		handleChangePage,
		sortType,
		handleChangeSortType,
		searchValue: query,
		handeChangeSearch,
	};
};
