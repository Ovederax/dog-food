import styled from '@emotion/styled';
import CircularProgress from '@mui/material/CircularProgress';
import { colors } from '../theme/colors';

interface Props {
	size?: string;
}

const Container = styled.div<Props>`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-grow: 1;
`;

export const Spinner = (props: Props) => {
	return (
		<Container>
			<CircularProgress
				sx={{ color: colors.primary.darker }}
				size={props.size}
			/>
		</Container>
	);
};
