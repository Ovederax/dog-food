import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { customBaseQuery } from './customBaseQuery';
import {
	GetProductsParams,
	Product,
	ProductsDto,
	ReviewCreateRequest,
} from './types';

export const productsApi = createApi({
	reducerPath: 'products',
	baseQuery: customBaseQuery,
	tagTypes: ['Products'],
	refetchOnMountOrArgChange: true,
	endpoints: (builder) => ({
		getProducts: builder.query<ProductsDto, GetProductsParams>({
			query: (params) => ({
				url: '/products',
				params,
			}),
			serializeQueryArgs: ({ endpointName, queryArgs }) => {
				return endpointName + queryArgs.query;
			},
			// Always merge incoming data to the cache entry
			merge: (currentCache, newItems, args) => {
				if (args.arg.page === 1) {
					currentCache.products = newItems.products;
					currentCache.total = newItems.total;
					return;
				}
				currentCache.products.push(...newItems.products);
			},
			// Refetch when the page arg changes
			forceRefetch({ currentArg, previousArg }) {
				return currentArg?.page !== previousArg?.page;
			},
		}),
		getProductById: builder.query<Product, { productId: string }>({
			query: ({ productId }) => ({
				url: `/products/${productId}`,
			}),
		}),
		addToFavorites: builder.mutation({
			query: (productId: string) => ({
				url: `/products/likes/${productId}`,
				method: 'PUT',
			}),
		}),
		deleteFromFavorites: builder.mutation({
			query: (productId: string) => ({
				url: `/products/likes/${productId}`,
				method: 'DELETE',
			}),
		}),
		addReview: builder.mutation<Product, ReviewCreateRequest>({
			query: ({ productId, body }) => ({
				url: `/products/review/${productId}`,
				method: 'POST',
				body,
			}),
		}),
	}),
});

export const {
	useGetProductsQuery,
	useGetProductByIdQuery,
	useAddToFavoritesMutation,
	useDeleteFromFavoritesMutation,
	useAddReviewMutation,
} = productsApi;
