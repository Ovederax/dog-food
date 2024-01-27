import styled from '@emotion/styled';
import { Stack, Typography } from '@mui/material';
import { colors } from '../../theme/colors';
import { Line } from './basket.styled';
import { Button } from '../../ui';
import ShipInfoBlock from '../../components/info-block/ship-info-block';
import React from 'react';
import { BasketItem } from '../../store/slices/basket-slice';
import { getProductPrice } from '../../utils/getProductPrice';
import { countProductsInBasket } from '../../utils/countProductsInBasket';
import { formatPrice } from '../../utils';

const Container = styled(Stack)`
	box-shadow: 0 2px 16px 0 rgba(96, 97, 112, 0.16),
		0 0 1px 0 rgba(40, 41, 61, 0.02);
	border-radius: 20px;
`;

interface Props {
	items: BasketItem[];
}

export const YourBasket = (props: Props) => {
	const { items } = props;

	const count = countProductsInBasket(items);
	const [oldPrice, newPrice] = items.reduce(
		(prev, it) => {
			const { product, count } = it;
			const { price, discount } = product;
			const { oldPrice, newPrice } = getProductPrice(price, discount);
			return [prev[0] + oldPrice * count, prev[1] + newPrice * count];
		},
		[0, 0]
	);

	const hasDiscount = oldPrice - newPrice !== 0;

	return (
		<Stack spacing={5}>
			<Container spacing={3} p={2}>
				<Typography variant='h3' fontWeight={800}>
					Ваша корзина
				</Typography>

				<Stack spacing={2}>
					<Stack direction='row' justifyContent='space-between'>
						<Typography variant='p2' color={colors.text.secondary}>
							Товары ({count})
						</Typography>
						<Typography variant='p2' fontWeight={600}>
							{formatPrice(oldPrice)}
						</Typography>
					</Stack>
					{hasDiscount && (
						<Stack direction='row' justifyContent='space-between'>
							<Typography variant='p2' color={colors.text.secondary}>
								Скидка
							</Typography>
							<Typography
								variant='p2'
								color={colors.custom.red}
								fontWeight={600}>
								- {formatPrice(oldPrice - newPrice)}
							</Typography>
						</Stack>
					)}
					<Line />
					<Stack direction='row' justifyContent='space-between'>
						<Typography variant='p2' fontWeight={800}>
							Общая стоимость
						</Typography>
						<Typography variant='h3' fontWeight={800}>
							{formatPrice(newPrice)}
						</Typography>
					</Stack>
				</Stack>

				<Button>Оформить заказ</Button>
			</Container>
			<ShipInfoBlock />
		</Stack>
	);
};
