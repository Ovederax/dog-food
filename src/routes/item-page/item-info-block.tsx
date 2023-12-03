import { Stack, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { SvgLoader } from '../../ui';
import { svgSize32ClassName, svgFillSecondaryClassName } from '../../utils';

const Container = styled(Stack)`
	display: flex;
	flex-direction: row;
	padding: 12px;
	border-radius: 12px;
	gap: 12px;
	background: #eceff180;
`;

interface Props {
	icon: string;
	title: string;
	children: React.ReactNode;
}

export const ItemInfoBlock = (props: Props) => {
	const { icon, title, children } = props;

	return (
		<Container>
			<SvgLoader
				path={icon}
				className={`${svgSize32ClassName} ${svgFillSecondaryClassName}`}
			/>
			<Stack spacing={1}>
				<Stack minHeight={32} justifyContent='center'>
					<Typography variant='p1' fontWeight={700}>
						{title}
					</Typography>
				</Stack>
				{children}
			</Stack>
		</Container>
	);
};
