import styled from '@emotion/styled';
import CircularProgress from '@mui/material/CircularProgress';
import { colors } from '../theme/colors';

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-grow: 1;
`;

export const Spinner = () => {
	return (
		<Container>
			<CircularProgress sx={{ color: colors.primary.darker }} />
		</Container>
	);
};
