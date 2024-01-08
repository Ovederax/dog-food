import { CardList, PageHeader } from '../components';
import { FavButton } from '../components/fav-button';
import { useState } from 'react';
import { NotFound } from '../components/not-found';
import { useAppSelector } from '../store/hooks/hooks';
import { Product } from '../store/api/types';
import { getUserId } from '../store/selectors/selectors';
import { useDeleteFromFavoritesMutation } from '../store/api/productsApi';

const PAGE_SIZE = 12;

export const Favorites = () => {
	const userId = useAppSelector(getUserId);
	const [page, setPage] = useState(1);

	const [deleteToFavoritesRequestFn] = useDeleteFromFavoritesMutation();

	// TODO нет api чтобы получать список избранных
	const data = ([] as any[]).filter((card) =>
		card.likes.some((it: any) => it === userId)
	);

	const handleChangePage = (
		event: React.ChangeEvent<unknown>,
		value: number
	) => {
		setPage(value);
	};

	const slicedData = data.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

	const renderFavButton = (product: Product) => {
		const toggleFav = () => {
			deleteToFavoritesRequestFn(product._id);
		};
		return <FavButton icon='common/ic-trash' onClick={toggleFav} />;
	};

	if (slicedData.length === 0) {
		return (
			<>
				<PageHeader to={'/'} backLabel='Назад' title='Избранное' />
				<NotFound
					text='В Избранном пока ничего нет'
					subtitle='Добавляйте товары в Избранное с помощью ❤️️'
				/>
			</>
		);
	}

	return (
		<>
			<PageHeader to={'/'} backLabel='Назад' title='Избранное' />

			<CardList
				mt={5}
				mb={2.5}
				products={[]}
				handleChangePage={handleChangePage}
				page={page}
				pageCount={Math.ceil(data.length / PAGE_SIZE)}
				renderFavButton={renderFavButton}
			/>
		</>
	);
};
