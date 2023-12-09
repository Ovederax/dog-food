import { Box, Stack, Typography } from '@mui/material';
import { Button } from '../../ui';
import { ProfileLine } from './profile-line';

export const Profile = () => {
	return (
		<>
			<Typography variant='h1'>Профиль</Typography>

			<Typography variant='h3' mt={2.5}>
				Александр Суворов
			</Typography>
			<Stack spacing={0.5} mt={1}>
				<ProfileLine icon='common/ic-phone' text='+7 (977) 980-12-09' />
				<ProfileLine icon='common/ic-mail' text='alexander@mail.com' />
			</Stack>

			<Box mt={3}>
				<Button variant='outlined'>Изменить</Button>
			</Box>

			<Box mt={5}>
				<Button variant='outlined'>Выйти</Button>
			</Box>
		</>
	);
};
