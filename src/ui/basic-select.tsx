import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { SelectProps } from '@mui/material/Select/Select';

export interface Option<T = string> {
	id: T;
	title: string;
}

interface Props {
	value: string;
	onChange: (value: string) => void;
	options: Option[];
}

export const BasicSelect = (props: Props) => {
	const { value, onChange, options } = props;

	const handleChange = (event: SelectChangeEvent<string>) => {
		onChange(event.target.value as string);
	};

	const elements = options.map((it) => (
		<MenuItem key={it.id} value={it.id}>
			{it.title}
		</MenuItem>
	));

	const selectProps: SelectProps<string> = {
		value,
		onChange: handleChange,
		size: 'small',
	};

	return (
		<Box sx={{ minWidth: 120 }}>
			<FormControl fullWidth>
				<Select {...selectProps}>{elements}</Select>
			</FormControl>
		</Box>
	);
};
