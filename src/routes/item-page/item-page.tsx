import { useNavigate, useParams } from 'react-router-dom';
import { ItemPageHeader } from './item-page-header';
import styled from '@emotion/styled';
import { Stack, Typography, Box } from '@mui/material';
import { Button, Selector, Spinner, SvgLoader } from '../../ui';
import { useLayoutEffect, useState } from 'react';
import { css } from '@emotion/css';
import { colors } from '../../theme/colors';
import { formatPrice } from '../../utils';
import { Miniatures } from './miniatures';
import { ItemInfoBlock } from './item-info-block';
import { ItemBlock } from './item-block';
import { PropertiesTable } from './properties-table';
import { CardBadge } from '../../components/card-badge';
import { useSelector } from 'react-redux';
import { getProduct } from '../../store/selectors/selectors';
import { useActions } from '../../store/hooks/hooks';
import { Review } from '../../store/api/types';
import ReviewItem from './review-item';
import { useUserProfileContext } from '../../providers/user-provider';
import { getURLForProductAddReview } from '../../const/routes';

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

export const ItemPage = () => {
	const { id } = useParams();

	const [count, setCount] = useState(0);

	const { product, loading, error } = useSelector(getProduct);
	const { getProductById } = useActions();
	const { userId } = useUserProfileContext();

	const navigate = useNavigate();

	useLayoutEffect(() => {
		if (id) {
			getProductById(id);
		}
	}, [getProductById, id]);

	const onAddReview = () => {
		navigate(getURLForProductAddReview(id || ''));
	};

	if (loading || (!product && !error)) {
		return <Spinner />;
	}

	if (error || !product) {
		return <>Error</>;
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
						<Selector count={count} onChange={setCount} />
						<Button sx={{ minWidth: 126 }}>В корзину</Button>
					</Stack>

					<Stack direction='row' spacing={1} sx={{ cursor: 'pointer' }}>
						<SvgLoader
							path='common/ic-favorites'
							className={favoritesClassName}
						/>
						<Typography color={colors.text.secondary}>В избранное</Typography>
					</Stack>

					<ItemInfoBlock icon='common/ic-truck' title='Доставка по всему Миру!'>
						<Typography variant='p2'>
							Доставка курьером — <b>от 399 ₽</b>
						</Typography>
						<Typography variant='p2'>
							Доставка в пункт выдачи — <b>от 199 ₽</b>
						</Typography>
					</ItemInfoBlock>

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
					{product.reviews
						.concat()
						.reverse()
						.slice(0, 3)
						.map((it: Review) => (
							<ReviewItem key={it._id} {...it} />
						))}
				</ItemBlock>
			</Stack>
		</>
	);
};
