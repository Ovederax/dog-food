import { CardList, PageHeader } from '../components';
import { cardListData } from '../_data/card-list-data';
import { FavButton } from '../components/fav-button';
import { useUserProfileContext } from '../providers/user-provider';
import { useState } from 'react';
import { NotFound } from '../components/not-found';

const PAGE_SIZE = 12;

export const Favorites = () => {
	const { userId } = useUserProfileContext();
	const [page, setPage] = useState(1);

	const data = cardListData.filter((card) =>
		card.likes.some((it) => it === userId)
	);

	const handleChangePage = (
		event: React.ChangeEvent<unknown>,
		value: number
	) => {
		setPage(value);
	};

	const slicedData = data.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

	const renderFavButton = () => {
		const toggleFav = () => {
			// TODO
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
				cardListData={slicedData}
				handleChangePage={handleChangePage}
				page={page}
				pageCount={Math.ceil(data.length / PAGE_SIZE)}
				renderFavButton={renderFavButton}
			/>
		</>
	);
};
