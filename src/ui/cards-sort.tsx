import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { BasicSelect } from '../ui';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import styled from '@emotion/styled';
import { colors } from '../theme/colors';
import { sortTypes, SortType } from '../_data/sort';
import { elevation4 } from '../theme/elevation';

const SortButton = styled('div')<{ selected: boolean }>(({ selected }) => {
	return `
		cursor: ${selected ? 'default' : 'pointer'};
		color: ${selected ? colors.text.main : colors.text.secondary};
	`;
});

interface Props {
	sortType: SortType;
	setSortType: (sortType: SortType) => void;
}

export const CardsSort = (props: Props) => {
	const { sortType, setSortType } = props;

	const theme = useTheme();
	const matchesDownMD = useMediaQuery(theme.breakpoints.down('md'));

	const elements = sortTypes.map((it) => (
		<SortButton
			key={String(it.id)}
			selected={sortType === it.id}
			onClick={() => setSortType(it.id)}>
			{it.title}
		</SortButton>
	));

	const onChangeSortType = (value: string) => {
		setSortType(value as SortType);
	};

	if (matchesDownMD) {
		return (
			<Stack mt={2.5} sx={{ width: '100%' }}>
				<BasicSelect
					options={sortTypes}
					value={sortType}
					onChange={onChangeSortType}
				/>
			</Stack>
		);
	}

	return (
		<Paper
			sx={{
				px: 2,
				py: 1.5,
				mt: 2.5,
				borderRadius: 1.5,
				boxShadow: elevation4,
			}}>
			<Stack direction='row' spacing={2}>
				{elements}
			</Stack>
		</Paper>
	);
};
