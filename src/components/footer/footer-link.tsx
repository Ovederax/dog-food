import { Typography } from '@mui/material';
import { colors } from '../../theme/colors';
import { Link } from 'react-router-dom';

interface Props {
	children: React.ReactNode;
	to: string;
}

export const FooterLink = (props: Props) => {
	const { children, to } = props;

	return (
		<Link to={to} style={{ textDecoration: 'none', display: 'flex' }}>
			<Typography variant='s1' fontWeight={600} color={colors.text.main}>
				{children}
			</Typography>
		</Link>
	);
};
