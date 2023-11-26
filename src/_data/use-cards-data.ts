import { CardItemData, cardListData, Review } from './card-list-data';
import { useEffect, useMemo, useState } from 'react';
import { SortType } from './sort';

const PAGE_SIZE = 12;
const DELAY = 2000;

const sortByPopular = (a: CardItemData, b: CardItemData) =>
	b.likes.length - a.likes.length;

const sortByDate = (a: CardItemData, b: CardItemData) =>
	new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf();

const sortByCheap = (a: CardItemData, b: CardItemData) => a.price - b.price;

const sortByExpensive = (a: CardItemData, b: CardItemData) => b.price - a.price;

const getRating = (reviews: Review[]): number => {
	if (reviews.length < 1) {
		return 0;
	}
	return reviews.reduce((acc, it) => acc + it.rating, 0) / reviews.length;
};

const sortByRating = (a: CardItemData, b: CardItemData) =>
	getRating(b.reviews) - getRating(a.reviews);

const sortByDiscount = (a: CardItemData, b: CardItemData) =>
	b.discount - a.discount;

function getDataBySort(data: CardItemData[], sortType: SortType) {
	switch (sortType) {
		case SortType.Popular:
			return data.sort(sortByPopular);
		case SortType.New:
			return data.sort(sortByDate);
		case SortType.CheapFirst:
			return data.sort(sortByCheap);
		case SortType.ExpensiveFirst:
			return data.sort(sortByExpensive);
		case SortType.ByRating:
			return data.sort(sortByRating);
		case SortType.ByDiscount:
			return data.sort(sortByDiscount);
		default:
			return data;
	}
}

export const useCardsData = () => {
	const [page, setPage] = useState(1);
	const [sortType, setSortType] = useState<SortType>(SortType.Popular);
	const [loading, setLoading] = useState(true);
	const [searchValue, setSearchValue] = useState('');

	const handleChangePage = (
		event: React.ChangeEvent<unknown>,
		value: number
	) => {
		setPage(value);
		setLoading(true);

		setTimeout(() => setLoading(false), DELAY);
	};

	const handleChangeSortType = (value: SortType) => {
		setPage(1);
		setSortType(value);
		setLoading(true);

		setTimeout(() => setLoading(false), DELAY);
	};

	const handelChangeSearch = (value: string) => {
		setPage(1);
		setSearchValue(value);
		setLoading(true);

		setTimeout(() => setLoading(false), DELAY);
	};

	const data = useMemo(() => {
		return getDataBySort(cardListData, sortType).filter((it) =>
			it.name.includes(searchValue.trim())
		);
	}, [searchValue, sortType]);

	useEffect(() => {
		setTimeout(() => setLoading(false), 1000);
	}, []);

	return {
		cardListData: data.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
		page,
		pageCount: Math.ceil(data.length / PAGE_SIZE),
		loading,
		handleChangePage,
		sortType,
		handleChangeSortType,
		searchValue,
		handelChangeSearch,
	};
};
