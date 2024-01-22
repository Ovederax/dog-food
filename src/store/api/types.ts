export interface User {
	name: string;
	about: string;
	avatar: string;
	email: string;
	password: string;
	isAdmin: boolean;
	group: string;
	token: string;
	_id: string;
}

export interface Comment {
	text: string;
	author: User;
	post: string;
	_id: string;
	updated_at: string;
	created_at: string;
}

export interface Post {
	title: string;
	image: string;
	text: string;
	tags: string[];
	isPublished: boolean;
	author: User;
	likes: User[];
	comments: Comment[];
	_id: string;
	group: string;
	updated_at: string;
	created_at: string;
}

export interface Review {
	name: string;
	city: string;
	text: string;
	rating: number;
	author: User;
	product: string;
	_id: string;
	updated_at: string;
	created_at: string;
}

export interface Product {
	name: string;
	price: number;
	discount: number;
	stock: number;
	available: boolean;
	wight: string;
	description: string;
	pictures: string;
	tags: string[];
	isPublished: boolean;
	author: User;
	likes: string[];
	reviews: Review[];
	_id: string;
	updated_at: string;
	created_at: string;
}

export interface ProductsDto {
	total: number;
	products: Product[];
}

export interface UserCreateDto {
	name: string;
	about: string;
	avatar: string;
	email: string;
	password: string;
	isAdmin: boolean;
	group: string;
}

export interface UserAuthenticateDto {
	email: string;
	password: string;
}

export interface ForgotPassDto {
	email: string;
}

export interface ResetPassDto {
	password: string;
}

export interface PostCreateDto {
	title: string;
	image: string;
	text: string;
	tags: string[];
	isPublished: boolean;
}

export interface PostUpdateDto {
	title: string;
	image: string;
	text: string;
	tags: string[];
	isPublished: boolean;
}

export interface ProductCreateDto {
	name: string;
	price: number;
	discount: number;
	stock: number;
	available: boolean;
	wight: string;
	description: string;
	pictures: string;
	tags: string[];
	isPublished: boolean;
}

export interface ProductUpdateDto {
	name: string;
	price: number;
	discount: number;
	stock: number;
	available: boolean;
	wight: string;
	description: string;
	pictures: string;
	tags: string[];
	isPublished: boolean;
}

export interface ReviewCreateRequest {
	productId: string;
	body: ReviewCreateDto;
}

export interface ReviewCreateDto {
	name: string;
	city: string;
	text: string;
	rating: number;
}

export interface UpdateMeDTO {
	name: string;
	about: string;
}

export interface UpdateMeAvatarDTO {
	avatar: string;
}

export interface UserAuthenticateDTO {
	data: User;
	token: string;
}

export interface MessageSendDto {
	message: string;
}

export interface GetProductsParams {
	page: number;
	limit: number;
	query: string;
}

export interface UpdateProductParams {
	productId: string;
	body: ProductUpdateDto;
}

export interface DeleteReviewParams {
	productId: string;
	reviewId: string;
}

export interface Tokens {
	accessToken: string;
	refreshToken: string; // В нашем приложении refreshToken не используется. Немного упростим себе жизнь)
}
