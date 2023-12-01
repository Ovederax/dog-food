import { Link, Typography } from '@mui/material';
import { colors } from '../../theme/colors';

interface Props {
	children: React.ReactNode;
	to: string;
}

export const FooterLink = (props: Props) => {
	const { children, to } = props;

	return (
		<Link href={to} sx={{ textDecoration: 'none', display: 'flex' }}>
			<Typography variant='s1' fontWeight={600} color={colors.text.main}>
				{children}
			</Typography>
		</Link>
	);
};
