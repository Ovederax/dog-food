import { Stack, Typography } from '@mui/material';
import { colors } from '../../theme/colors';
import { SvgLoader } from '../../ui';
import { svgFillSecondaryClassName, svgSize16ClassName } from '../../utils';

interface Props {
	icon: string;
	text: string;
}

export const ProfileLine = (props: Props) => {
	const { icon, text } = props;

	return (
		<Stack direction='row' spacing={1} alignItems='center'>
			<SvgLoader
				path={icon}
				className={[svgFillSecondaryClassName, svgSize16ClassName]}
			/>
			<Typography variant='s1' color={colors.text.secondary}>
				{text}
			</Typography>
		</Stack>
	);
};
