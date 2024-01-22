import styled from '@emotion/styled';
import Stack from '@mui/material/Stack';
import { Logo } from '../logo';
import { colors } from '../../theme/colors';
import { PageContainer, Search, SvgLoader } from '../../ui';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { favoritesClassName } from '../../utils';
import { ROUTES } from '../../routes';
import { useAppSelector } from '../../store/hooks/hooks';
import {
	getAccessToken,
	getBasketItems,
} from '../../store/selectors/selectors';
import {
	useProductsDataHandlers,
	useSearchQuery,
} from '../../store/hooks/use-products-data';
import { SvgLink } from '../../ui/svg-link';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { countProductsInBasket } from '../../utils/countProductsInBasket';

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

interface LinkObj {
	path: string;
	to: string;
	className?: string;
	bubbleCount?: number;
}

const favLink = {
	to: ROUTES.favorites,
	path: 'common/ic-favorites',
	className: favoritesClassName,
};

const cartLink = {
	to: ROUTES.basket,
	path: 'common/ic-cart',
};

const profileLink = {
	to: ROUTES.profile,
	path: 'special/ic-profile',
};

const linkListForNotAuthorized: LinkObj[] = [
	{
		to: ROUTES.signIn,
		path: 'common/ic-user',
	},
];

export const Header = () => {
	const theme = useTheme();
	const matchesDownMD = useMediaQuery(theme.breakpoints.down('md'));

	const searchValue = useSearchQuery();
	const { handeChangeSearch } = useProductsDataHandlers();
	const basketItems = useSelector(getBasketItems);

	const accessToken = useAppSelector(getAccessToken);
	const linkList: LinkObj[] = useMemo(() => {
		return accessToken
			? [
					favLink,
					{
						...cartLink,
						bubbleCount: countProductsInBasket(basketItems),
					},
					profileLink,
			  ]
			: linkListForNotAuthorized;
	}, [accessToken, basketItems]);

	if (matchesDownMD) {
		return (
			<Wrapper>
				<Container direction='row' useFlexGap>
					<Logo />
					{accessToken ? (
						<Search value={searchValue} onChange={handeChangeSearch} />
					) : null}

					<Stack direction='row'>
						{accessToken ? (
							<SvgLoader path='common/ic-menu' />
						) : (
							<SvgLink to={ROUTES.signIn} path='common/ic-user' />
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
				{accessToken ? (
					<Search value={searchValue} onChange={handeChangeSearch} />
				) : null}

				<Stack direction='row' spacing={4.25}>
					{linkList.map((it) => (
						<SvgLink
							key={it.to}
							to={it.to}
							path={it.path}
							className={it.className}
							bubbleCount={it.bubbleCount}
						/>
					))}
				</Stack>
			</Container>
		</Wrapper>
	);
};
