import { Grid, Box } from '@mui/material';
import { Card } from './card';
import { Pagination } from '../ui';
import { CardItemData } from '../_data/card-list-data';
import { ChangeEvent } from 'react';

interface Props {
	mt?: number;
	mb?: number;
	cardListData: CardItemData[];
	page: number;
	pageCount: number;
	handleChangePage: (event: ChangeEvent<unknown>, page: number) => void;
}

export const CardList = (props: Props) => {
	const { mt, mb, cardListData, page, handleChangePage, pageCount } = props;

	const elements = cardListData.map((it) => (
		<Grid key={it._id} item xs={6} sm={4} md={3} lg={3}>
			<Card {...it} />
		</Grid>
	));

	return (
		<Box mt={mt} mb={mb}>
			<Grid
				container
				columnSpacing={{ xs: 1, sm: 2 }}
				rowSpacing={5}
				flexWrap='wrap'
				direction='row'>
				{elements}
			</Grid>

			<Box mt={5}>
				<Pagination page={page} onChange={handleChangePage} count={pageCount} />
			</Box>
		</Box>
	);
};
