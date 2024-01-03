import {
	createSlice,
	ActionReducerMapBuilder,
	SerializedError,
} from '@reduxjs/toolkit';
import { api } from '../api/api';
import { UpdateMeAvatarDTO, UpdateMeDTO, User } from '../api/types';
import { noop } from '../../utils/noop';
import { createAppAsyncThunk } from '../createAppAsyncThunk';
import { isActionFulfilled, isActionPending, isActionRejected } from './utils';

const sliceName = 'user';

export const fetchMe = createAppAsyncThunk<User>(
	`${sliceName}/fetchMe`,
	async (_, { fulfillWithValue, rejectWithValue }) => {
		try {
			const data = await api.user.getMe();
			return fulfillWithValue(data);
		} catch (err) {
			return rejectWithValue(err);
		}
	}
);

export const updateMe = createAppAsyncThunk<User, UpdateMeDTO>(
	`${sliceName}/updateMe`,
	async (dto: UpdateMeDTO, { fulfillWithValue, rejectWithValue }) => {
		try {
			const data = await api.user.updateMe(dto);
			return fulfillWithValue(data);
		} catch (err) {
			return rejectWithValue(err);
		}
	}
);

export const updateMeAvatar = createAppAsyncThunk<User, UpdateMeAvatarDTO>(
	`${sliceName}/updateMeAvatar`,
	async (dto: UpdateMeAvatarDTO, { fulfillWithValue, rejectWithValue }) => {
		try {
			const data = await api.user.updateMeAvatar(dto);
			return fulfillWithValue(data);
		} catch (err) {
			return rejectWithValue(err);
		}
	}
);

interface State {
	loading: boolean;
	error: SerializedError | null | unknown;
	userData: User | null;
}

const initialState: State = {
	loading: false,
	error: null,
	userData: null,
};

export const usersSlice = createSlice({
	name: sliceName,
	initialState,
	reducers: {
		noop,
	},
	extraReducers: (builder: ActionReducerMapBuilder<State>) => {
		builder
			.addMatcher(isActionFulfilled(`${sliceName}/`), (state, action) => {
				state.loading = false;
				state.userData = action.payload;
			})
			.addMatcher(isActionPending(`${sliceName}/`), (state) => {
				state.loading = true;
				state.error = null;
			})
			.addMatcher(isActionRejected(`${sliceName}/`), (state, action) => {
				state.error = action.payload;
				state.loading = false;
			});
	},
});
