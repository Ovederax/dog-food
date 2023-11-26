import styled from '@emotion/styled';
import TextField from '@mui/material/TextField';
import { colors } from '../theme/colors';
import { Box } from '@mui/material';
import { OutlinedInputProps } from '@mui/material/OutlinedInput';

const SearchStyled = styled(TextField)`
	div {
		border-radius: 24px;
	}

	div:hover fieldset,
	div.Mui-focused fieldset {
		border-color: ${colors.primary.darker} !important;
	}

	input {
		background: ${colors.text.white};
		border-radius: 24px;
		border: none;
		outline: none;
	}

	input::placeholder {
		color: ${colors.text.secondary};
	}

	& fieldset {
		border-color: ${colors.primary.main};
	}

	max-width: 468px;
`;

interface Props {
	value: string;
	onChange: (value: string) => void;
}

export const Search = (props: Props) => {
	const { value, onChange } = props;

	const onChangeWrapper: OutlinedInputProps['onChange'] = (e) => {
		onChange(e.target.value);
	};

	return (
		<Box mx={4} flexGrow={1} display='flex' justifyContent='center'>
			<SearchStyled
				id='search'
				placeholder='Поиск'
				size='small'
				fullWidth
				value={value}
				onChange={onChangeWrapper}
			/>
		</Box>
	);
};
