import { Pagination as MuiPagination } from '@mui/material';
import { colors } from '../theme/colors';
import * as React from 'react';

interface Props {
	page: number;
	count: number;
	onChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

const paginationSX = {
	'& .MuiPaginationItem-page': {
		color: colors.text.main,
		borderColor: colors.text.outline,
	},
	'& .MuiPaginationItem-page:hover': {
		backgroundColor: colors.primary.lighter,
	},
	'& ul li .Mui-selected': {
		backgroundColor: colors.primary.main,
		borderColor: colors.primary.main,
	},
	'.& ul li .Mui-selected.Mui-focusVisible': {
		outline: 'solid red',
	},
	'& ul li .Mui-selected.Mui-focusVisible, & ul li .Mui-selected:hover': {
		backgroundColor: colors.primary.main,
		borderColor: colors.primary.main,
	},
	'& .MuiPaginationItem-ellipsis': {
		height: '40px',
		display: 'flex',
		alignItems: 'center',
		border: `1px solid ${colors.text.outline}`,
	},
	'& ul li:first-of-type': {
		marginRight: 'auto',
	},
	'& ul li:last-child': {
		marginLeft: 'auto',
	},
	'& .MuiPaginationItem-previousNext:hover': {
		backgroundColor: colors.primary.lighter,
	},
};

export const Pagination = (props: Props) => {
	const { page, onChange, count } = props;

	return (
		<MuiPagination
			page={page}
			onChange={onChange}
			count={count || 0}
			variant='outlined'
			size='large'
			sx={paginationSX}
		/>
	);
};
