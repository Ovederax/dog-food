import React from 'react';
import { Stack, Typography } from '@mui/material';
import { NotFound } from '../../components/not-found';
import styled from '@emotion/styled';

interface Props {
	searchValue: string;
	count: number;
}

const ExtraBold = styled.span`
	font-weight: 800;
`;

const FoundProducts = (props: Props) => {
	const { searchValue, count } = props;

	if (count === 0) {
		return (
			<Stack spacing={2.5}>
				{searchValue.trim() && (
					<Typography variant='h1' mt={2.5} fontWeight={300}>
						{'По запросу '}
						<ExtraBold>{searchValue}</ExtraBold>
						{` найдено ${count} товаров`}
					</Typography>
				)}
				<NotFound text='Простите, по вашему запросу товаров не надено.' />
			</Stack>
		);
	}

	if (searchValue.trim()) {
		return (
			<Typography variant='h1' mt={2.5} fontWeight={300}>
				{'По запросу '}
				<ExtraBold>{searchValue}</ExtraBold>
				{` найдено ${count} товаров`}
			</Typography>
		);
	}

	return null;
};

export default FoundProducts;
