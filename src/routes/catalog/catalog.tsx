import { CardList, PageHeader } from '../../components';
import { CardsSort } from '../../ui';
import { FavButton } from '../../components/fav-button';
import { useProductsData } from '../../store/hooks/use-products-data';
import { Product } from '../../store/api/types';
import { useActions, useAppSelector } from '../../store/hooks/hooks';
import { getFavoritesCache, getUserId } from '../../store/selectors/selectors';
import {
	useAddToFavoritesMutation,
	useDeleteFromFavoritesMutation,
} from '../../store/api/productsApi';
import { QueryComponent } from '../../utils/hoc/withQuery';
import React from 'react';
import FoundProducts from './found-products';
import { FavoriteProductCache } from '../../store/slices/favorites-cache-slice';
import { LoadMore } from '../../ui/load-more';

export const Catalog = () => {
	const {
		products,
		isError,
		error,
		isLoading,
		isFetching,
		refetch,
		page,
		handleChangePage,
		pageCount,
		sortType,
		handleChangeSortType,
		totalCount,
		searchValue,
		isEndOfList,
		loadMoreProducts,
	} = useProductsData();

	const { addToFavorites, removeFromFavorite } = useActions();

	const userId = useAppSelector(getUserId);
	const favoritesCache = useAppSelector(getFavoritesCache);

	const [addToFavoritesRequestFn] = useAddToFavoritesMutation();
	const [deleteToFavoritesRequestFn] = useDeleteFromFavoritesMutation();

	if (isError || isLoading) {
		return (
			<QueryComponent
				isLoading={isLoading}
				isError={isError}
				refetch={refetch}
				error={error}
			/>
		);
	}

	if (products.length === 0) {
		return <FoundProducts searchValue={searchValue} count={products.length} />;
	}

	const renderFavButton = (product: Product) => {
		const productId = product._id;
		const cached = favoritesCache.find(
			(it: FavoriteProductCache) => it.productId === productId
		);
		const isLike = cached
			? cached.inFav
			: product.likes.some((it) => it === userId);

		const toggleFav = () => {
			if (isLike) {
				deleteToFavoritesRequestFn(productId).then(() =>
					removeFromFavorite(productId)
				);
			} else {
				addToFavoritesRequestFn(productId).then(() =>
					addToFavorites(productId)
				);
			}
		};
		return (
			<FavButton
				icon='common/ic-favorites'
				onClick={toggleFav}
				redFill={isLike}
			/>
		);
	};

	return (
		<>
			<PageHeader to='/' backLabel='Главная' title='Каталог' />

			<FoundProducts searchValue={searchValue} count={totalCount} />

			<CardsSort sortType={sortType} setSortType={handleChangeSortType} />

			<CardList
				mt={5}
				mb={2.5}
				products={products}
				handleChangePage={handleChangePage}
				page={page}
				pageCount={pageCount}
				renderFavButton={renderFavButton}
			/>

			<LoadMore
				isLoading={isFetching}
				action={loadMoreProducts}
				isEndOfList={isEndOfList}
			/>
		</>
	);
};
