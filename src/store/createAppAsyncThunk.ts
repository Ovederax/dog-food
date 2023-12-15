import { AppDispatch, RootState } from './store';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
	state: RootState;
	dispatch: AppDispatch;
	// extra: Api;
}>();

type AsyncFunction<T> = (arg: T) => Promise<unknown>;

export const createErrorWrapAsyncThunk = <T>(
	typePrefix: string,
	apiFn: AsyncFunction<T>
) => {
	return createAppAsyncThunk(
		typePrefix,
		async (arg: T, { fulfillWithValue, rejectWithValue }) => {
			try {
				const data = await apiFn(arg);
				return fulfillWithValue(data);
			} catch (err) {
				return rejectWithValue(err);
			}
		}
	);
};
