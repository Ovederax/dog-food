import styled from '@emotion/styled';
import { colors } from '../theme/colors';
import { Stack, Typography, Box } from '@mui/material';
import { CardItemData } from '../_data/card-list-data';
import { SvgLoader, Button } from '../ui';
import { useState } from 'react';

const CardBadge = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	color: ${colors.text.white};
	background: ${colors.custom.red};
	padding: 2px 8px;

	font-size: 1rem;
	line-height: 1.25rem;
	font-weight: 800;

	border-radius: 20px;
	min-height: 24px;
	min-width: 58px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

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

const FavButton = styled('div')<{ inFav: boolean }>(({ inFav }) => {
	const base = `
    position: absolute;
    top: 0;
    right: 0;
    & svg path {
      cursor: pointer;
    }
    & svg path:last-child {
      fill: ${inFav ? colors.custom.red : 'transparent'};
    }
  `;

	if (inFav) {
		return `
      ${base}
      & svg path {
        fill: ${colors.custom.red};
      }
    `;
	}

	return base;
});

const Filler = styled.div`
	height: 14px;
`;

const formatPrice = (value: number) => {
	return `${value} ₽`;
};

export const Card = (props: CardItemData) => {
	const { discount, price, name, wight, pictures } = props;

	const [inFav, setInFav] = useState(false);

	const toggleFav = () => {
		setInFav((prev) => !prev);
	};

	const firstPrice = price + (price * discount) / 100;

	return (
		<Container>
			<Box>
				{discount ? <CardBadge>-{discount}%</CardBadge> : null}
				<FavButton onClick={toggleFav} inFav={inFav}>
					<SvgLoader path='common/ic-favorites' alt='DogFood' />
				</FavButton>

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
						<Typography variant='p1'>{name}</Typography>
					</Stack>
				</Stack>
			</Box>

			<Box>
				<Button>В корзину</Button>
			</Box>
		</Container>
	);
};
