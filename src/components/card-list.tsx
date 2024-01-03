import { Grid, Box } from '@mui/material';
import { Card } from './card';
import { Pagination } from '../ui';
import React, { ChangeEvent } from 'react';
import { Product } from '../store/api/types';

interface Props {
	mt?: number;
	mb?: number;
	products: Product[];
	page: number;
	pageCount: number;
	handleChangePage: (event: ChangeEvent<unknown>, page: number) => void;
	renderFavButton?: (cardData: Product) => React.ReactNode;
}

export const CardList = (props: Props) => {
	const {
		mt,
		mb,
		products,
		page,
		handleChangePage,
		pageCount,
		renderFavButton,
	} = props;

	const elements = products.map((it) => (
		<Grid key={it._id} item xs={6} sm={4} md={3} lg={3}>
			<Card {...it} renderFavButton={renderFavButton} />
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
