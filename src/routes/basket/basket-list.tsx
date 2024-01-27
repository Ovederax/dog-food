import { BasketItem } from '../../store/slices/basket-slice';
import { Stack } from '@mui/material';
import React from 'react';
import BasketItemComponent from './basket-item-component';
import { Line } from './basket.styled';

interface Props {
	items: BasketItem[];
}

export const BasketList = (props: Props) => {
	const { items } = props;

	return (
		<Stack spacing={3} maxWidth='620px' flexGrow={1}>
			{items.map((it, idx) => (
				<React.Fragment key={it.product._id}>
					{idx !== 0 && <Line />}
					<BasketItemComponent basketItem={it} />
				</React.Fragment>
			))}
		</Stack>
	);
};
