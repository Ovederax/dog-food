import styled from '@emotion/styled';
import Stack from '@mui/material/Stack';
import { Logo } from '../logo';
import { colors } from '../../theme/colors';
import { PageContainer, SvgLoader, Search } from '../../ui';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useDataContext } from '../../providers/data-provider';
import { favoritesClassName } from '../../utils';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes';

const Wrapper = styled.div`
	background: ${colors.primary.main};
	display: flex;
	width: 100%;
	justify-content: center;
	margin-bottom: 20px;
`;

const Container = styled(PageContainer)`
	padding-top: 12px;
	padding-bottom: 12px;
	display: flex;
	flex-grow: 1;
	justify-content: space-between;
	align-items: center;
`;

const SvgLink = (props: { to: string; path: string; className?: string }) => {
	const { to, path, className } = props;
	return (
		<Link to={to}>
			<SvgLoader path={path} className={className} />
		</Link>
	);
};

export const Header = () => {
	const theme = useTheme();
	const matchesDownMD = useMediaQuery(theme.breakpoints.down('md'));

	const { searchValue, handelChangeSearch } = useDataContext();

	if (matchesDownMD) {
		return (
			<Wrapper>
				<Container direction='row' useFlexGap>
					<Logo />
					<Search value={searchValue} onChange={handelChangeSearch} />

					<Stack direction='row'>
						<SvgLoader path='common/ic-menu' />
					</Stack>
				</Container>
			</Wrapper>
		);
	}

	return (
		<Wrapper>
			<Container direction='row' useFlexGap>
				<Logo />
				<Search value={searchValue} onChange={handelChangeSearch} />

				<Stack direction='row' spacing={4.25}>
					<SvgLink
						to={ROUTES.favorites}
						path='common/ic-favorites'
						className={favoritesClassName}
					/>
					<SvgLink to={ROUTES.basket} path='common/ic-cart' />
					<SvgLink to={ROUTES.profile} path='special/ic-profile' />
				</Stack>
			</Container>
		</Wrapper>
	);
};
