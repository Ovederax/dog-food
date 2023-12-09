import { SvgLoader } from '../../ui';
import { Stack } from '@mui/material';
import { svgSize20ClassName, getFillClassName } from '../../utils';
import { colors } from '../../theme/colors';

export const Stars = (props: { rating: number }) => {
	const { rating } = props;

	const stars: string[] = [];
	for (let i = 0; i < Math.trunc(rating); ++i) {
		stars.push('ic-star-fill');
	}
	if (rating - Math.trunc(rating) > 0) {
		stars.push('ic-star-lefthalf');
	}
	for (let i = Math.ceil(rating); i < 5; ++i) {
		stars.push('ic-star');
	}

	const svgFillClassName = getFillClassName(colors.primary.darker);

	const elements = stars.map((it) => (
		<SvgLoader
			key={it}
			className={`${svgSize20ClassName} ${svgFillClassName}`}
			path={`common\\${it}`}
		/>
	));

	return (
		<Stack direction='row' spacing={0.5}>
			{elements}
		</Stack>
	);
};
