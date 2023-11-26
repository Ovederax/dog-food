import Stack from '@mui/material/Stack';
import { SvgLoader } from '../ui';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { getSizeClassName } from '../utils/svg-styles';

export const Logo = () => {
	const theme = useTheme();
	const matchesDownMD = useMediaQuery(theme.breakpoints.down('md'));

	if (matchesDownMD) {
		return <SvgLoader path='logo/logo' className={getSizeClassName(40)} />;
	}

	return (
		<Stack direction='row' spacing={2} alignItems='flex-end'>
			<SvgLoader path='logo/logo' className={getSizeClassName(56)} />
			<Box pb={1}>
				<SvgLoader path='logo/logo-label' alt='DogFood' />
			</Box>
		</Stack>
	);
};
