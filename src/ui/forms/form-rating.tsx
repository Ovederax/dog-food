import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Rating } from '@mui/material';

type Props = {
	name: string;
};

const FormRating = (props: Props) => {
	const { name } = props;

	const { control } = useFormContext();

	return (
		<Controller
			control={control}
			name={name}
			render={({ field }) => <Rating {...field} value={Number(field.value)} />}
		/>
	);
};

export default FormRating;
