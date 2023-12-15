import { CardList, PageHeader } from '../components';
import { CardsSort, Spinner } from '../ui';
import { Stack, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { NotFound } from '../components/not-found';
import { FavButton } from '../components/fav-button';
import { useUserProfileContext } from '../providers/user-provider';
import { useProductsData } from '../_data/use-products-data';
import { Product } from '../store/api/types';
import { useActions } from '../store/hooks/hooks';

const ExtraBold = styled.span`
	font-weight: 800;
`;

export const Catalog = () => {
	const {
		products,
		error,
		loading,
		page,
		handleChangePage,
		pageCount,
		sortType,
		handleChangeSortType,
		searchValue,
	} = useProductsData();

	const { userId } = useUserProfileContext();

	const { addToFavorites, deleteFromFavorites } = useActions();

	if (loading || (!products && !error)) {
		return <Spinner />;
	}

	if (error || !products) {
		return <>Error</>;
	}

	if (products.length === 0) {
		return (
			<Stack spacing={2.5}>
				{searchValue.trim() && (
					<Typography variant='h1' mt={2.5} fontWeight={300}>
						{'По запросу '}
						<ExtraBold>{searchValue}</ExtraBold>
						{` найдено ${products.length} товаров`}
					</Typography>
				)}
				<NotFound text='Простите, по вашему запросу товаров не надено.' />
			</Stack>
		);
	}

	const renderFavButton = (product: Product) => {
		const isLike = product.likes.some((it) => it === userId);

		const toggleFav = () => {
			if (isLike) {
				deleteFromFavorites(product._id);
			} else {
				addToFavorites(product._id);
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

			{searchValue.trim() && (
				<Typography variant='h1' mt={2.5} fontWeight={300}>
					{'По запросу '}
					<ExtraBold>{searchValue}</ExtraBold>
					{` найдено ${products.length} товаров`}
				</Typography>
			)}

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
		</>
	);
};
