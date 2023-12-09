import { Box, Stack, Typography } from '@mui/material';
import { colors } from '../../theme/colors';

interface LineData {
	label: string;
	value: string[];
}

const items: LineData[] = [
	{
		label: 'Вес',
		value: ['1 шт 120-200 грамм'],
	},
	{
		label: 'Цена',
		value: ['490 ₽ за 100 грамм'],
	},
	{
		label: 'Польза',
		value: [
			'Большое содержание аминокислот и микроэлементов оказывает положительное воздействие на общий обмен веществ собаки.',
			'Способствуют укреплению десен и жевательных мышц.',
			'Развивают зубочелюстной аппарат, отвлекают собаку во время смены зубов.',
			'Имеет цельную волокнистую структуру, при разжевывание получается эффект зубной щетки, лучше всего очищает клыки собак.',
			'Следует учесть высокую калорийность продукта.',
		],
	},
];

const TableLine = ({ label, value }: LineData) => {
	return (
		<Stack direction='row' spacing={1}>
			<Box minWidth={140} maxWidth={140}>
				<Typography variant='p1' color={colors.text.secondary}>
					{label}
				</Typography>
			</Box>
			<Stack spacing={1.5}>
				{value.map((it) => (
					<Typography key={it} variant='p1'>
						{it}
					</Typography>
				))}
			</Stack>
		</Stack>
	);
};

export const PropertiesTable = () => {
	return (
		<Stack spacing={2.5}>
			{items.map((it) => (
				<TableLine key={it.label} {...it} />
			))}
		</Stack>
	);
};
