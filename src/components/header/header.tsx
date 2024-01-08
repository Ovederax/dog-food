import styled from '@emotion/styled';
import Stack from '@mui/material/Stack';
import { Logo } from '../logo';
import { colors } from '../../theme/colors';
import { PageContainer, Search, SvgLoader } from '../../ui';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { favoritesClassName } from '../../utils';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { useProductsData } from '../../store/hooks/use-products-data';
import { useAppSelector } from '../../store/hooks/hooks';
import { getAccessToken } from '../../store/selectors/selectors';

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

// Интерфейс для объекта-ссылки
interface LinkObj {
	path: string;
	href: string;
	className?: string;
}
// Набор ссылок, которые будут доступны АВТОРИЗИРОВАННЫМ пользователям
const linkListForAuthorized: LinkObj[] = [
	{
		href: ROUTES.favorites,
		path: 'common/ic-favorites',
		className: favoritesClassName,
	},
	{
		href: ROUTES.basket,
		path: 'common/ic-cart',
	},
	{
		href: ROUTES.profile,
		path: 'special/ic-profile',
	},
];
// Набор ссылок, которые будут доступны НЕАВТОРИЗИРОВАННЫМ пользователям
const linkListForNotAuthorized: LinkObj[] = [
	{
		href: ROUTES.signIn,
		path: 'common/ic-user',
	},
];

export const Header = () => {
	const theme = useTheme();
	const matchesDownMD = useMediaQuery(theme.breakpoints.down('md'));

	const { searchValue, handeChangeSearch } = useProductsData();

	const accessToken = useAppSelector(getAccessToken);
	const linkList = accessToken
		? linkListForAuthorized
		: linkListForNotAuthorized;

	if (matchesDownMD) {
		return (
			<Wrapper>
				<Container direction='row' useFlexGap>
					<Logo />
					<Search value={searchValue} onChange={handeChangeSearch} />

					<Stack direction='row'>
						{accessToken ? (
							<SvgLoader path='common/ic-menu' />
						) : (
							<SvgLink to={ROUTES.signIn} path={'common/ic-user'} />
						)}
					</Stack>
				</Container>
			</Wrapper>
		);
	}

	return (
		<Wrapper>
			<Container direction='row' useFlexGap>
				<Logo />
				<Search value={searchValue} onChange={handeChangeSearch} />

				<Stack direction='row' spacing={4.25}>
					{linkList.map((it) => (
						<SvgLink
							key={it.href}
							to={it.href}
							path={it.path}
							className={it.className}
						/>
					))}
				</Stack>
			</Container>
		</Wrapper>
	);
};
