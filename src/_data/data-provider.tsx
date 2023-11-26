import React, { createContext, useContext } from 'react';
import { useCardsData } from './use-cards-data';
import { SortType } from './sort';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

const defaultValue = {
	cardListData: [],
	page: 1,
	pageCount: 1,
	loading: true,
	handleChangePage: noop,
	sortType: SortType.New,
	handleChangeSortType: noop,
	searchValue: '',
	handelChangeSearch: noop,
};

type ContextType = ReturnType<typeof useCardsData>;

const DataContext = createContext<ContextType>(defaultValue);

export const useDataContext = () => useContext(DataContext);

interface Props {
	children: React.ReactNode;
}

export const DataProvider = (props: Props) => {
	const cardsData = useCardsData();

	return (
		<DataContext.Provider value={cardsData}>
			{props.children}
		</DataContext.Provider>
	);
};