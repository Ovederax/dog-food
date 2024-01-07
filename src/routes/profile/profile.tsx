import ViewProfile from './view-profile';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../const/routes';
import { useFetchMeQuery } from '../../store/api/authApi';
import { QueryComponent } from '../../utils/hoc/withQuery';
import React from 'react';

export const Profile = () => {
	const { data, error, isFetching, isError, refetch } = useFetchMeQuery();

	const navigate = useNavigate();

	const toEditMode = () => {
		navigate(ROUTES.editProfile);
	};

	if (isError || isFetching || !data) {
		return (
			<QueryComponent
				isLoading={isFetching}
				isError={isError}
				refetch={refetch}
				error={error}
			/>
		);
	}

	return <ViewProfile userData={data} toEditMode={toEditMode} />;
};
