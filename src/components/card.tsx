import styled from '@emotion/styled';
import { colors } from '../theme/colors';
import { Box, Stack, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { getURLForCard } from '../const/routes';
import { formatPrice } from '../utils';
import { CardBadge } from './card-badge';
import { Button } from '../ui';
import { Product } from '../store/api/types';
import { useActions, useAppSelector } from '../store/hooks/hooks';
import { getBasketItems } from '../store/selectors/selectors';
import { toast } from 'react-toastify';
import { BasketItem } from '../store/slices/basket-slice';

const Container = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 100%;
	height: 100%;
`;

const Image = styled.img`
	display: block;
	width: 100%;
	min-height: 187px;
	background: #ddd;
`;

const Filler = styled.div`
	height: 14px;
`;

const TitleLinkStyled = styled(Link)`
	color: ${colors.text.main};
	text-decoration: none;

	&:hover {
		text-decoration: underline;
	}
`;

type Props = {
	product: Product;
	renderFavButton?: ((cardData: Product) => React.ReactNode) | undefined;
};

export const Card = (props: Props) => {
	const { product, renderFavButton } = props;
	const { _id, discount, price, name, wight, pictures } = product;

	const basketItems: BasketItem[] = useAppSelector(getBasketItems);
	const { addBasketItem } = useActions();
	const location = useLocation();
	const linkState = { location };

	const firstPrice = price + (price * discount) / 100;

	const basketItem = basketItems.find((it) => it.product._id === product._id);

	const onAddToBasket = () => {
		if (product.stock === 0) {
			toast.error('Нельзя добавить! Нет товара');
			return;
		}
		if (basketItem && basketItem.count + 1 > product.stock) {
			toast.error('Нельзя добавить! Вы забрали весь товар со складов!');
			return;
		}
		addBasketItem({
			product,
			count: (basketItem?.count || 0) + 1,
		});
	};

	return (
		<Container>
			<Box>
				{discount ? <CardBadge>-{discount}%</CardBadge> : null}
				{renderFavButton ? renderFavButton(props.product) : null}

				<Image src={pictures} />

				<Stack mt={2} mb={2} spacing={0.75}>
					<div>
						{discount ? (
							<Typography
								variant='s1'
								color={colors.text.main}
								fontWeight={600}>
								<del>{formatPrice(firstPrice)}</del>
							</Typography>
						) : (
							<Filler />
						)}
						<Typography variant='h3' color={colors.custom.red}>
							{formatPrice(price)}
						</Typography>
					</div>

					<Stack spacing={0.25}>
						<Typography variant='s1'>{wight}</Typography>
						<TitleLinkStyled to={getURLForCard(_id)} state={linkState}>
							<Typography variant='p1'>{name}</Typography>
						</TitleLinkStyled>
					</Stack>
				</Stack>
			</Box>

			<Box>
				<Button onClick={onAddToBasket}>
					В корзину {basketItem?.count ? `(${basketItem.count})` : ''}
				</Button>
			</Box>
		</Container>
	);
};
