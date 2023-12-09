import styled from '@emotion/styled';
import { Box, Stack, Typography } from '@mui/material';
import { Button, SvgLoader } from '../ui';
import { css } from '@emotion/css';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../const/routes';
import { colors } from '../theme/colors';

const Container = styled.div`
	min-height: 324px;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 20px;
`;

const notFoundClassName = css`
	svg {
		width: 80px;
		height: 80px;
	}
`;

interface Props {
	text: string;
	subtitle?: string;
}

export const NotFound = (props: Props) => {
	const { text, subtitle } = props;

	const navigate = useNavigate();

	return (
		<Container>
			<Stack spacing={2.5} alignItems='center' justifyContent='center'>
				<SvgLoader path='common/ic-notfound' className={notFoundClassName} />
				<Box display='flex' flexDirection='column' alignItems='center'>
					<Typography variant='p1' fontWeight={700}>
						{text}
					</Typography>
					{subtitle && (
						<Typography variant='p2' color={colors.text.secondary}>
							{subtitle}
						</Typography>
					)}
				</Box>
				<Box>
					<Button variant='outlined' onClick={() => navigate(ROUTES.home)}>
						На главную
					</Button>
				</Box>
			</Stack>
		</Container>
	);
};
