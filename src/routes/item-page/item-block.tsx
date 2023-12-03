import { Stack, Typography } from '@mui/material';

interface Props {
	title: string;
	children: React.ReactNode;
}

export const ItemBlock = (props: Props) => {
	const { title, children } = props;
	return (
		<Stack spacing={2.5}>
			<Typography variant='h2'>{title}</Typography>
			{children}
		</Stack>
	);
};
