import React from 'react';
import { Stack, Typography } from '@mui/material';
import { colors } from '../../theme/colors';
import { Selector, SelectorSize, SvgLoader } from '../../ui';
import {
	formatPrice,
	pointerClassName,
	svgFillSecondaryClassName,
} from '../../utils';
import { BasketItem } from '../../store/slices/basket-slice';
import styled from '@emotion/styled';
import { getProductPrice } from '../../utils/getProductPrice';
import { useActions } from '../../store/hooks/hooks';
import { toast } from 'react-toastify';

const MiniImg = styled.img`
	background: #ddd;
	display: block;
	width: 62px;
	min-width: 62px;
	height: 62px;
	min-height: 62px;
`;

interface Props {
	basketItem: BasketItem;
}

const BasketItemComponent = (props: Props) => {
	const { basketItem } = props;
	const { product, count } = basketItem;
	const { price, discount } = product;
	const { removeFromBasket, addBasketItem } = useActions();

	const onChange = (value: number) => {
		if (value > (product.stock || 0)) {
			toast.error('Нельзя добавить! Недостаточно товара!');
			return;
		}
		addBasketItem({
			product,
			count: value,
		});
	};

	const onRemove = () => {
		removeFromBasket(product._id);
	};

	const { oldPrice, newPrice } = getProductPrice(price, discount);

	return (
		<Stack direction='row' spacing={4} justifyContent='space-between'>
			<Stack direction='row' spacing={4}>
				<MiniImg src={product.pictures} />
				<Stack ml={2} spacing={1}>
					<Typography variant='p2' fontWeight={700}>
						{product.name}
					</Typography>
					<Typography variant='s1' color={colors.text.secondary}>
						{product.description}
					</Typography>
				</Stack>
			</Stack>
			<Stack direction='row' spacing={4} alignItems='center'>
				<Stack ml={4} justifyContent='center'>
					<Selector
						min={1}
						max={product.stock}
						count={count}
						onChange={onChange}
						size={SelectorSize.Small}
					/>
				</Stack>
				<Stack justifyContent='center' alignItems='flex-end' minWidth='92px'>
					{discount > 0 && (
						<Typography
							variant='s1'
							fontWeight={700}
							sx={{ textDecoration: 'line-through' }}>
							{formatPrice(oldPrice)}
						</Typography>
					)}
					<Typography variant='h3' color={colors.custom.red} fontWeight={800}>
						{formatPrice(newPrice)}
					</Typography>
				</Stack>
				<Stack justifyContent='center'>
					<SvgLoader
						path='common/ic-trash'
						className={[svgFillSecondaryClassName, pointerClassName]}
						onClick={onRemove}
					/>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default BasketItemComponent;
