import { useEffect, useState } from 'react';
import { SortType } from './sort';
import { useSelector } from 'react-redux';
import { getProducts } from '../store/selectors/selectors';
import { useActions } from '../store/hooks/hooks';

const PAGE_SIZE = 12;

export const useProductsData = () => {
	const [page, setPage] = useState(1);
	const [sortType, setSortType] = useState<SortType>(SortType.Popular);
	const [searchValue, setSearchValue] = useState('');

	const { products: dto, loading, error } = useSelector(getProducts);

	const { getAllProducts } = useActions();

	const handleChangePage = (
		event: React.ChangeEvent<unknown>,
		value: number
	) => {
		setPage(value);
	};

	const handleChangeSortType = (value: SortType) => {
		setPage(1);
		setSortType(value);
	};

	const handelChangeSearch = (value: string) => {
		setPage(1);
		setSearchValue(value);
	};

	useEffect(() => {
		getAllProducts({
			limit: PAGE_SIZE,
			page,
			query: searchValue,
		});
	}, [getAllProducts, page, searchValue]);

	return {
		products: dto?.products || [],
		error,
		page,
		pageCount: Math.ceil((dto?.total || 0) / PAGE_SIZE),
		loading,
		handleChangePage,
		sortType,
		handleChangeSortType,
		searchValue,
		handelChangeSearch,
	};
};
