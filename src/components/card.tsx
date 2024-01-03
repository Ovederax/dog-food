import styled from '@emotion/styled';
import { colors } from '../theme/colors';
import { Stack, Typography, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { getURLForCard } from '../const/routes';
import { formatPrice } from '../utils';
import { CardBadge } from './card-badge';
import { Button } from '../ui';
import { Product } from '../store/api/types';

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

type Props = Product & {
	renderFavButton?: ((cardData: Product) => React.ReactNode) | undefined;
};

export const Card = (props: Props) => {
	const { _id, discount, price, name, wight, pictures, renderFavButton } =
		props;

	const location = useLocation();
	const linkState = { location };

	const firstPrice = price + (price * discount) / 100;

	return (
		<Container>
			<Box>
				{discount ? <CardBadge>-{discount}%</CardBadge> : null}
				{renderFavButton ? renderFavButton(props) : null}

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
				<Button>В корзину</Button>
			</Box>
		</Container>
	);
};
