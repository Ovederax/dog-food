import React, { useState } from 'react';
import { Review } from '../../store/api/types';
import ReviewItem from './review-item';
import { Pagination } from '../../ui';

const PAGE_SIZE = 5;

interface Props {
	reviews: Review[];
}

const ReviewsList = (props: Props) => {
	const { reviews } = props;

	const [page, setPage] = useState(1);

	const onChangePage = (event: unknown, value: number) => {
		setPage(value);
	};

	if (reviews.length === 0) {
		return null;
	}

	const items = reviews
		.concat()
		.reverse()
		.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
		.map((it: Review) => <ReviewItem key={it._id} {...it} />);

	return (
		<>
			{items}
			<Pagination
				page={page}
				count={Math.ceil(reviews.length / PAGE_SIZE)}
				onChange={onChangePage}
			/>
		</>
	);
};

export default ReviewsList;
