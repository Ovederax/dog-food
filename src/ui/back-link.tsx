import { Link, Typography } from '@mui/material';
import { colors } from '../theme/colors';
import styled from '@emotion/styled';
import { SvgLoader } from '../ui';

interface Props {
	to: string;
	title: string;
}

const LinkStyled = styled(Link)`
	color: ${colors.text.secondary};
	text-decoration: none;
	display: flex;
	align-items: center;

	& div,
	& div svg {
		display: block;
		width: 14px;
		height: 14px;
		fill: ${colors.text.secondary};
	}
	& > div {
		margin-top: -2px;
	}

	& > span {
		display: inline-block;
		margin-left: 4px;
	}
`;

export const BackLink = (props: Props) => {
	const { to, title } = props;

	return (
		<LinkStyled href={to}>
			<SvgLoader path='common/ic-left-arrow' display='inline-block' />
			<Typography variant='p2' component='span' color={colors.text.secondary}>
				{title}
			</Typography>
		</LinkStyled>
	);
};