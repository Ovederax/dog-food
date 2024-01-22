import { createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { User } from '../api/types';

const sliceName = 'user';

interface State {
	loading: boolean;
	error: SerializedError | null | unknown;
	userData: User | null;
	accessToken: string | null;
	refreshToken: string | null;
}

const initialState: State = {
	loading: false,
	error: null,
	userData: null,
	accessToken: null,
	refreshToken: null,
};

export const usersSlice = createSlice({
	name: sliceName,
	initialState,
	reducers: {
		setTokens: (
			state,
			action: PayloadAction<{ accessToken: string; refreshToken: string }>
		) => {
			return {
				...state,
				...action.payload,
			};
		},
		setUser: (state, action: PayloadAction<User>) => {
			return {
				...state,
				userData: action.payload,
			};
		},
		clearUser: () => {
			return initialState;
		},
	},
});

export const { setTokens, setUser, clearUser } = usersSlice.actions;
