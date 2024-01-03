import React from 'react';
import { Review } from '../../store/api/types';
import { Stack, Typography } from '@mui/material';
import { Stars } from './stars';
import { colors } from '../../theme/colors';

const padStart = (num: number) => {
	return num.toString().padStart(2, '0');
};

const formatDate = (date: string) => {
	const d = new Date(date);
	return `${padStart(d.getDate())}.${padStart(
		d.getMonth() + 1
	)}.${d.getFullYear()}`;
};

const ReviewItem = (props: Review) => {
	const { city, author, rating, text, updated_at } = props;

	return (
		<Stack
			spacing={2}
			pt={2}
			pb={2.5}
			borderTop={`1px solid ${colors.text.form}`}>
			<Stack spacing={1}>
				<Stack direction='row' spacing={1} alignItems='flex-end'>
					<Typography variant='h3'>{author.name}</Typography>
					<Typography variant='p2' color={colors.text.secondary}>
						{formatDate(updated_at)}
					</Typography>
				</Stack>
				<Stars rating={rating} />
				<Typography>{city}</Typography>
			</Stack>
			<Typography>{text}</Typography>
		</Stack>
	);
};

export default ReviewItem;
