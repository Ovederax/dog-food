import styled from '@emotion/styled';
import Stack from '@mui/material/Stack';
import { Logo, Search } from '.';
import { colors } from '../theme/colors';
import { PageContainer, SvgLoader } from '../ui';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useDataContext } from '../_data/data-provider';
import { favoritesClassName } from '../utils/svg-styles';

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
					<SvgLoader
						path='common/ic-favorites'
						className={favoritesClassName}
					/>
					<SvgLoader path='common/ic-cart' />
					<SvgLoader path='special/ic-profile' />
				</Stack>
			</Container>
		</Wrapper>
	);
};
