import { useLocation, useNavigate } from 'react-router-dom';
import { BackLink } from '../../ui';
import { Stack, Typography } from '@mui/material';
import { ROUTES } from '../../const/routes';
import { colors } from '../../theme/colors';
import { Stars } from './stars';
import styled from '@emotion/styled';
import { pluralize } from '../../utils';
import { MouseEventHandler } from 'react';
import { Product } from '../../store/api/types';

const StyledSpan = styled.span`
	color: ${colors.text.secondary};
`;

interface Props {
	cardData: Product;
}

export const ItemPageHeader = (props: Props) => {
	const { cardData } = props;
	const { reviews } = cardData;

	const rating =
		reviews.reduce((acc, it) => acc + it.rating, 0) / (reviews.length || 1);

	const { state } = useLocation();
	const navigate = useNavigate();

	const onClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
		e.preventDefault();
		if (state) {
			navigate(-1);
		} else {
			navigate(ROUTES.catalog);
		}
	};

	return (
		<Stack spacing={0.25} alignItems='flex-start'>
			<BackLink to='/' title='Назад' onClick={onClick} />
			<Typography variant='h1'>{cardData.name}</Typography>
			<Stack direction='row' spacing={2}>
				<Typography variant='p2'>
					<StyledSpan>Артикул:</StyledSpan> 2388907
				</Typography>
				<Stars rating={rating} />
				<Typography variant='p2' color={colors.primary.darker}>
					{reviews.length}{' '}
					{pluralize(reviews.length, ['отзыв', 'отзыва', 'отзывов'])}
				</Typography>
			</Stack>
		</Stack>
	);
};
