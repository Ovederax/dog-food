import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortType } from '../sort';

interface State {
	sortType: SortType;
	page: number;
}

const initialState: State = {
	sortType: SortType.Popular,
	page: 1,
};

export const searchParamsSlice = createSlice({
	name: 'searchParams',
	initialState,
	reducers: {
		setPage: (state, action: PayloadAction<number>) => {
			state.page = action.payload;
		},
		incrementPage: (state) => {
			state.page += 1;
		},
		setSortType: (state, action: PayloadAction<SortType>) => {
			state.sortType = action.payload;
		},
	},
});

export const { setPage, incrementPage, setSortType } =
	searchParamsSlice.actions;
