import { CardList } from '../components';
import { BackLink, CardsSort, Spinner } from '../ui';
import { Stack, Typography } from '@mui/material';
import { useDataContext } from '../_data/data-provider';
import styled from '@emotion/styled';
import { NotFoundProducts } from '../components/not-found-products';

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
				<NotFoundProducts />
			</Stack>
		);
	}

	return (
		<>
			<Stack spacing={0.25}>
				<BackLink to='/' title='Главная' />
				<Typography variant='h1'>Каталог</Typography>
			</Stack>

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
			/>
		</>
	);
};
