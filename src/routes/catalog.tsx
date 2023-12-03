import { CardList, PageHeader } from '../components';
import { CardsSort, Spinner } from '../ui';
import { Stack, Typography } from '@mui/material';
import { useDataContext } from '../providers/data-provider';
import styled from '@emotion/styled';
import { NotFound } from '../components/not-found';
import { FavButton } from '../components/fav-button';
import { useUserProfileContext } from '../providers/user-provider';
import { CardItemData } from '../_data/card-list-data';

const ExtraBold = styled.span`
	font-weight: 800;
`;

export const Catalog = () => {
	const {
		cardListData,
		page,
		handleChangePage,
		pageCount,
		loading,
		sortType,
		handleChangeSortType,
		searchValue,
	} = useDataContext();

	const { userId } = useUserProfileContext();

	if (loading) {
		return (
			<>
				<Spinner />
			</>
		);
	}

	if (cardListData.length === 0) {
		return (
			<Stack spacing={2.5}>
				{searchValue.trim() && (
					<Typography variant='h1' mt={2.5} fontWeight={300}>
						{'По запросу '}
						<ExtraBold>{searchValue}</ExtraBold>
						{` найдено ${cardListData.length} товаров`}
					</Typography>
				)}
				<NotFound text='Простите, по вашему запросу товаров не надено.' />
			</Stack>
		);
	}

	const renderFavButton = (cardData: CardItemData) => {
		const toggleFav = () => {
			// TODO
		};
		return (
			<FavButton
				icon='common/ic-favorites'
				onClick={toggleFav}
				redFill={cardData.likes.some((it) => it === userId)}
			/>
		);
	};

	return (
		<>
			<PageHeader to='/' backLabel='Главная' title='Каталог' />

			{searchValue.trim() && (
				<Typography variant='h1' mt={2.5} fontWeight={300}>
					{'По запросу '}
					<ExtraBold>{searchValue}</ExtraBold>
					{` найдено ${cardListData.length} товаров`}
				</Typography>
			)}

			<CardsSort sortType={sortType} setSortType={handleChangeSortType} />

			<CardList
				mt={5}
				mb={2.5}
				cardListData={cardListData}
				handleChangePage={handleChangePage}
				page={page}
				pageCount={pageCount}
				renderFavButton={renderFavButton}
			/>
		</>
	);
};
