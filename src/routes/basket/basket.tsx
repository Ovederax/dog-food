import React from 'react';
import { Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { getBasketItems } from '../../store/selectors/selectors';
import { BasketList } from './basket-list';
import { BasketItem } from '../../store/slices/basket-slice';
import { pluralize } from '../../utils';
import { NotFound } from '../../components/not-found';
import { YourBasket } from './your-basket';

export const Basket = () => {
	const items: BasketItem[] = useSelector(getBasketItems);

	const header = (
		<Typography variant='h1'>
			<b>
				{items.length} {pluralize(items.length, ['товар', 'товара', 'товаров'])}
			</b>{' '}
			в корзине
		</Typography>
	);

	if (items.length === 0) {
		return (
			<>
				<Stack mb={2.5}>{header}</Stack>
				<NotFound
					text='В корзине нет товаров'
					subtitle='Добавьте товар, нажав кнопку «В корзину» в карточке товара'
				/>
			</>
		);
	}

	return (
		<>
			{header}
			<Stack direction='row' justifyContent='space-between' mt={2.5}>
				<BasketList items={items} />
				<YourBasket items={items} />
			</Stack>
		</>
	);
};
