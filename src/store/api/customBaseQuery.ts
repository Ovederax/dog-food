import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { RootState } from '../store';

const baseUrl = 'https://api.react-learning.ru/';

export const customBaseQuery = fetchBaseQuery({
	baseUrl,
	prepareHeaders: (headers, { getState }) => {
		const accessToken = (getState() as RootState).user.accessToken;
		if (accessToken) {
			headers.set('authorization', `Bearer ${accessToken}`);
		}
		return headers;
	},
});
