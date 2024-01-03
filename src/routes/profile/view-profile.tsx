import React from 'react';
import { Stack, Typography } from '@mui/material';
import { ProfileLine } from './profile-line';
import { Button } from '../../ui';
import { User } from '../../store/api/types';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../const/routes';

interface Props {
	userData: User;
	toEditMode: () => void;
}

const ViewProfile = (props: Props) => {
	const { userData, toEditMode } = props;

	const navigate = useNavigate();

	const onExit = () => {
		// TODO Logout
		navigate(ROUTES.home);
	};

	return (
		<div>
			<Typography variant='h1'>Профиль</Typography>

			<Typography variant='h3' mt={2.5}>
				{userData?.name}
			</Typography>

			<Stack spacing={0.5} mt={1}>
				<ProfileLine icon='common/ic-phone' text='+7 (977) 980-12-09' />
				<ProfileLine icon='common/ic-mail' text={userData?.email} />
			</Stack>

			<Button variant='outlined' sx={{ mt: 3 }} onClick={toEditMode}>
				Изменить
			</Button>

			<Button variant='outlined' sx={{ mt: 5 }} onClick={onExit}>
				Выйти
			</Button>
		</div>
	);
};

export default ViewProfile;
