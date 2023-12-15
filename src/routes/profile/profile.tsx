import { Spinner } from '../../ui';
import { useActions, useAppSelector } from '../../store/hooks/hooks';
import { getUser } from '../../store/selectors/selectors';
import { useLayoutEffect } from 'react';
import ViewProfile from './view-profile';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../const/routes';

export const Profile = () => {
	const { loading, error, userData } = useAppSelector(getUser);
	const { fetchMe } = useActions();
	const navigate = useNavigate();

	const toEditMode = () => {
		navigate(ROUTES.editProfile);
	};

	useLayoutEffect(() => {
		fetchMe();
	}, [fetchMe]);

	if (loading || (!userData && !error)) {
		return <Spinner />;
	}

	if (error || !userData) {
		return <>Error</>;
	}

	return <ViewProfile userData={userData} toEditMode={toEditMode} />;
};
