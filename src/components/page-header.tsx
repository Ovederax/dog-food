import { BackLink } from '../ui';
import { Stack, Typography } from '@mui/material';

interface Props {
	to: string;
	backLabel: string;
	title: string;
}

export const PageHeader = (props: Props) => {
	const { to, backLabel, title } = props;

	return (
		<Stack spacing={0.25}>
			<BackLink to={to} title={backLabel} />
			<Typography variant='h1'>{title}</Typography>
		</Stack>
	);
};
