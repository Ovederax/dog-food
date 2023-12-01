import styled from '@emotion/styled';
import { Box, Stack, Typography } from '@mui/material';
import { Button, SvgLoader } from '../ui';
import { css } from '@emotion/css';

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

export const NotFoundProducts = () => {
	return (
		<Container>
			<Stack spacing={2.5} alignItems='center' justifyContent='center'>
				<SvgLoader path='common/ic-notfound' className={notFoundClassName} />
				<Typography variant='p1'>
					Простите, по вашему запросу товаров не надено.
				</Typography>
				<Box>
					<Button variant='outlined'>На главную</Button>
				</Box>
			</Stack>
		</Container>
	);
};
