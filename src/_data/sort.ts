import { Option } from '../ui';

export enum SortType {
	Popular = '1',
	New = '2',
	CheapFirst = '3',
	ExpensiveFirst = '4',
	ByRating = '5',
	ByDiscount = '6',
}

export const sortTypes: Option<SortType>[] = [
	{
		id: SortType.Popular,
		title: 'Популярные',
	},
	{
		id: SortType.New,
		title: 'Новинки',
	},
	{
		id: SortType.CheapFirst,
		title: 'Сначала дешёвые',
	},
	{
		id: SortType.ExpensiveFirst,
		title: 'Сначала дорогие',
	},
	{
		id: SortType.ByRating,
		title: 'По рейтингу',
	},
	{
		id: SortType.ByDiscount,
		title: 'По скидке',
	},
];
