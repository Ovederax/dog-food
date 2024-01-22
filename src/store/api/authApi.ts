import { Tokens, UpdateMeDTO, User } from './types';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { customBaseQuery } from './customBaseQuery';

interface SignUpFormValues {
	email: string;
	password: string;
	group: string;
}

type SignUpResponse = User;

interface SignInFormValues {
	email: string;
	password: string;
}

interface SignInResponse {
	data: User;
	token: Tokens['accessToken'];
}

export const authApi = createApi({
	reducerPath: 'auth',
	baseQuery: customBaseQuery,
	endpoints: (builder) => ({
		signUp: builder.mutation<SignUpResponse, SignUpFormValues>({
			query: (data) => ({
				url: 'signup',
				method: 'POST',
				body: data,
			}),
		}),
		signIn: builder.mutation<SignInResponse, SignInFormValues>({
			query: (data) => ({
				url: 'signin',
				method: 'POST',
				body: data,
			}),
		}),
		fetchMe: builder.query<User, void>({
			query: () => ({
				url: '/users/me',
			}),
		}),
		updateMe: builder.mutation<User, UpdateMeDTO>({
			query: (body) => ({
				url: '/users/me',
				method: 'PATCH',
				body,
			}),
		}),
	}),
});

export const {
	useSignUpMutation,
	useSignInMutation,
	useFetchMeQuery,
	useUpdateMeMutation,
} = authApi;
