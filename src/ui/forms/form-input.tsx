import React from 'react';
import { TextFieldProps } from '@mui/material/TextField/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';

type Props = {
	name: string;
} & TextFieldProps;

const FormInput = (props: Props) => {
	const { name, required, ...otherProps } = props;

	const {
		control,
		formState: { errors },
	} = useFormContext();

	return (
		<Controller
			control={control}
			name={name}
			render={({ field }) => (
				<TextField
					required={required}
					{...otherProps}
					{...field}
					onChange={(e) => {
						field.onChange(e);
						otherProps.onChange && otherProps.onChange(e);
					}}
					error={!!errors[name]}
					helperText={
						(errors[name]
							? errors[name]?.message
							: otherProps.helperText) as string
					}
				/>
			)}
		/>
	);
};

export default FormInput;
