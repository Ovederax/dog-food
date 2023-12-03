import { useParams } from 'react-router-dom';
import { cardListData } from '../../_data/card-list-data';
import { ItemPageHeader } from './item-page-header';
import styled from '@emotion/styled';
import { Stack, Typography, Box } from '@mui/material';
import { Button, Selector, SvgLoader } from '../../ui';
import { useState } from 'react';
import { css } from '@emotion/css';
import { colors } from '../../theme/colors';
import { formatPrice } from '../../utils';
import { Miniatures } from './miniatures';
import { ItemInfoBlock } from './item-info-block';
import { ItemBlock } from './item-block';
import { PropertiesTable } from './properties-table';
import { CardBadge } from '../../components/card-badge';

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

	const cardData = cardListData.find((it) => it._id === id);

	if (!cardData) {
		return <>Nothing to show</>;
	}

	const { price, discount, description, pictures } = cardData;
	const firstPrice = price + (price * discount) / 100;

	return (
		<>
			<ItemPageHeader cardData={cardData} />

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
			</Stack>
		</>
	);
};
