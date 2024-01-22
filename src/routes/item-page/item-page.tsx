import { useNavigate, useParams } from 'react-router-dom';
import { ItemPageHeader } from './item-page-header';
import styled from '@emotion/styled';
import { Box, Stack, Typography } from '@mui/material';
import { Button, Selector, SvgLoader } from '../../ui';
import { useState } from 'react';
import { css } from '@emotion/css';
import { colors } from '../../theme/colors';
import { formatPrice } from '../../utils';
import { Miniatures } from './miniatures';
import { ItemInfoBlock } from '../../components/info-block/item-info-block';
import { ItemBlock } from './item-block';
import { PropertiesTable } from './properties-table';
import { CardBadge } from '../../components/card-badge';
import { getBasketItems, getUserId } from '../../store/selectors/selectors';
import { useActions, useAppSelector } from '../../store/hooks/hooks';
import { Product, Review } from '../../store/api/types';
import { getURLForProductAddReview } from '../../const/routes';
import { useGetProductByIdQuery } from '../../store/api/productsApi';
import { withQuery } from '../../utils/hoc/withQuery';
import ShipInfoBlock from '../../components/info-block/ship-info-block';
import { BasketItem } from '../../store/slices/basket-slice';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ReviewsList from './reviews-list';

export const favoritesClassName = css`
	& svg path:first-child {
		fill: ${colors.text.secondary};
	}
`;

const Image = styled.img`
	display: block;
	max-width: 343px;
	min-height: 343px;
	height: auto;
	background: #ddd;
`;

interface ItemProps {
	id: string;
	product: Product | undefined;
}

const Item = (props: ItemProps) => {
	const { id, product } = props;

	const items: BasketItem[] = useSelector(getBasketItems);
	const basketItem = items.find((it) => it.product._id === id);
	const [count, setCount] = useState(0);
	const userId = useAppSelector(getUserId);
	const { addBasketItem } = useActions();

	const navigate = useNavigate();

	const onAddReview = () => {
		navigate(getURLForProductAddReview(id || ''));
	};

	const addToBasket = () => {
		const nowHave = basketItem?.count || 0;
		if (!product) {
			return;
		}

		if (count + nowHave > (product.stock || 0)) {
			toast.error('Нельзя добавить! Недостаточно товара!');
			return;
		}
		addBasketItem({
			product,
			count: count + nowHave,
		});
		setCount(0);
	};

	if (!product) {
		return null;
	}

	const { price, discount, description, pictures } = product;
	const firstPrice = price + (price * discount) / 100;

	return (
		<>
			<ItemPageHeader cardData={product} />

			<Stack
				direction='row'
				mt={2.5}
				flexWrap={{ md: 'nowrap', xs: 'wrap' }}
				gap={5}>
				<Box position='relative'>
					{discount ? <CardBadge>-{discount}%</CardBadge> : null}
					<Image src={pictures} />
				</Box>
				<Miniatures images={[pictures]} />
				<Stack spacing={3}>
					<div>
						{discount ? (
							<Typography
								variant='s1'
								color={colors.text.main}
								fontWeight={600}>
								<del>{formatPrice(firstPrice)}</del>
							</Typography>
						) : null}
						<Typography variant='h3' color={colors.custom.red}>
							{formatPrice(price)}
						</Typography>
					</div>
					<Stack direction='row' spacing={2}>
						<Selector
							count={count}
							onChange={setCount}
							max={Math.max(product.stock - (basketItem?.count || 0), 0)}
						/>
						<Button sx={{ minWidth: 126 }} onClick={addToBasket}>
							В корзину {basketItem?.count ? `(${basketItem.count})` : ''}
						</Button>
					</Stack>

					<Stack direction='row' spacing={1} sx={{ cursor: 'pointer' }}>
						<SvgLoader
							path='common/ic-favorites'
							className={favoritesClassName}
						/>
						<Typography color={colors.text.secondary}>В избранное</Typography>
					</Stack>

					<ShipInfoBlock />

					<ItemInfoBlock icon='common/ic-quality' title='Гарантия качества'>
						<Typography variant='p2'>
							Если Вам не понравилось качество нашей продукции, мы вернем
							деньги, либо сделаем все возможное, чтобы удовлетворить ваши
							нужды.
						</Typography>
					</ItemInfoBlock>
				</Stack>
			</Stack>

			<Stack mt={5} spacing={5}>
				<ItemBlock title='Описание'>
					<Typography variant='p1'>{description}</Typography>
				</ItemBlock>
				<ItemBlock title='Характеристики'>
					<PropertiesTable />
				</ItemBlock>
				<ItemBlock title='Отзывы'>
					{!product.reviews.some((it: Review) => it.author._id === userId) && (
						<Button onClick={onAddReview} sx={{ alignSelf: 'flex-start' }}>
							Добавить отзыв
						</Button>
					)}
					<ReviewsList reviews={product.reviews} />
				</ItemBlock>
			</Stack>
		</>
	);
};

const ItemWithQuery = withQuery(Item);

export const ItemPage = () => {
	const { id = '' } = useParams();

	const { data, error, isFetching, isError, refetch } = useGetProductByIdQuery({
		productId: id,
	});

	return (
		<ItemWithQuery
			product={data}
			id={id}
			isLoading={isFetching}
			error={error}
			isError={isError}
			refetch={refetch}
		/>
	);
};
