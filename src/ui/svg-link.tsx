import { Link } from 'react-router-dom';
import { SvgLoader } from './svg-loader';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { colors } from '../theme/colors';

const Bubble = styled.div`
	position: absolute;
	top: -6px;
	right: -2px;
	text-align: center;
	min-width: 24px;
	padding: 0 4px;
	border-radius: 8px;
	background: ${colors.custom.green};
	transform: translateX(50%);
`;

interface Props {
	to: string;
	path: string;
	className?: string;
	bubbleCount?: number;
}

export const SvgLink = (props: Props) => {
	const { to, path, className, bubbleCount } = props;

	return (
		<Link to={to} style={{ position: 'relative' }}>
			{bubbleCount ? (
				<Bubble>
					<Typography variant='s1' fontWeight={700} color={colors.text.white}>
						{bubbleCount}
					</Typography>
				</Bubble>
			) : null}
			<SvgLoader path={path} className={className} />
		</Link>
	);
};
