import {
	ForgotPassDto,
	MessageSendDto,
	Post,
	PostCreateDto,
	Product,
	ProductCreateDto,
	ProductsDto,
	ProductUpdateDto,
	ResetPassDto,
	Review,
	ReviewCreateDto,
	UpdateMeAvatarDTO,
	UpdateMeDTO,
	User,
	UserAuthenticateDTO,
	UserAuthenticateDto,
	UserCreateDto,
} from './types';

type Method = 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';

const GROUP = 'group-4';
const jwtToken =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDBjNGYzODRlZTQxOTk3NWZiZDMwMWUiLCJncm91cCI6Imdyb3VwLTExIiwiaWF0IjoxNjc4NTI4MzI3LCJleHAiOjE3MTAwNjQzMjd9.hFwIhkSYXini5j5J0pyysePPmwOSy0SsvtxB-B6ocCQ';

interface Params {
	method: Method;
	url: string;
	body?: object;
}

async function request<R>(params: Params) {
	const { url, method, body } = params;

	const response = await fetch(`https://api.react-learning.ru${url}`, {
		headers: {
			Authorization: `Bearer ${jwtToken}`,
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		method,
		body: body ? JSON.stringify(body) : void 0,
	});

	if (response.status !== 200) {
		throw await response.json();
	}

	return (await response.json()) as Promise<R>;
}

const posts = {
	getAll: () =>
		request<Post[]>({
			method: 'GET',
			url: `/v2/${GROUP}/posts`,
		}),
	create: (body: PostCreateDto) =>
		request<Post>({
			method: 'POST',
			url: `/v2/${GROUP}/posts`,
			body,
		}),
	getById: (postId: string) =>
		request<Post>({
			method: 'GET',
			url: `/v2/${GROUP}/posts/${postId}`,
		}),
	update: (postId: string) =>
		request<Post>({
			method: 'PATCH',
			url: `/v2/${GROUP}/posts/${postId}`,
		}),
	delete: (postId: string) =>
		request<Post>({
			method: 'DELETE',
			url: `/v2/${GROUP}/posts/${postId}`,
		}),
	addLike: (postId: string) =>
		request<Post>({
			method: 'PUT',
			url: `/v2/${GROUP}/posts/likes/${postId}`,
		}),
	deleteLike: (postId: string) =>
		request<Post>({
			method: 'DELETE',
			url: `/v2/${GROUP}/posts/likes/${postId}`,
		}),
};

const products = {
	getAll: (page: number, limit: number, query: string) =>
		request<ProductsDto>({
			method: 'GET',
			url: `/products?page=${page}&limit=${limit}&query=${query}`,
		}),
	create: (body: ProductCreateDto) =>
		request<Product>({
			method: 'POST',
			url: '/products',
			body,
		}),
	getFiltered: (query: string) =>
		request<ProductsDto>({
			method: 'GET',
			url: `/products/search?query=${query}`,
		}),
	getById: (productId: string) =>
		request<Product>({
			method: 'GET',
			url: `/products/${productId}`,
		}),
	update: (productId: string, body: ProductUpdateDto) =>
		request<Product>({
			method: 'PATCH',
			url: `/products/${productId}`,
			body,
		}),
	delete: (productId: string) =>
		request<Product>({
			method: 'DELETE',
			url: `/products/${productId}`,
		}),
	addToFavorites: (productId: string) =>
		request<Product>({
			method: 'PUT',
			url: `/products/likes/${productId}`,
		}),
	deleteFromFavorites: (productId: string) =>
		request<Product>({
			method: 'DELETE',
			url: `/products/likes/${productId}`,
		}),
	// ----- REVIEWS -----
	getAllReview: () =>
		request<Review[]>({
			method: 'GET',
			url: '/products/review/',
		}),
	addReview: (productId: string, body: ReviewCreateDto) =>
		request<Product>({
			method: 'POST',
			url: `/products/review/${productId}`,
			body,
		}),
	getReviewByProduct: (productId: string) =>
		request<Review[]>({
			method: 'GET',
			url: `/products/review/${productId}`,
		}),
	deleteReview: (productId: string, reviewId: string) =>
		request<Product>({
			method: 'DELETE',
			url: `/products/likes/${productId}/${reviewId}`,
		}),
};

const user = {
	getAll: () =>
		request<User[]>({
			method: 'GET',
			url: '/users',
		}),
	getById: (userId: string) =>
		request<User>({
			method: 'GET',
			url: `/users/${userId}`,
		}),
	getMe: () =>
		request<User>({
			method: 'GET',
			url: '/users/me',
		}),
	updateMe: (body: UpdateMeDTO) =>
		request<User>({
			method: 'PATCH',
			url: '/users/me',
			body,
		}),
	updateMeAvatar: (body: UpdateMeAvatarDTO) =>
		request<User>({
			method: 'PATCH',
			url: '/users/me/avatar',
			body,
		}),
};

const auth = {
	signup: (body: UserCreateDto) =>
		request<User>({
			method: 'POST',
			url: '/signup',
			body,
		}),
	signin: (body: UserAuthenticateDto) =>
		request<UserAuthenticateDTO>({
			method: 'POST',
			url: '/signin',
			body,
		}),
	forgotPassword: (body: ForgotPassDto) =>
		request<MessageSendDto>({
			method: 'POST',
			url: '/forgot-password',
			body,
		}),
	passwordReset: (token: string, body: ResetPassDto) =>
		request<UserAuthenticateDTO>({
			method: 'POST',
			url: `/password-reset/${token}`,
			body,
		}),
};

export const api = {
	posts,
	products,
	user,
	auth,
};
