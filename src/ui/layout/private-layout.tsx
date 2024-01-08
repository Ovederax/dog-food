import { Footer, Header } from '../../components';
import { Navigate, Outlet } from 'react-router-dom';
import { PageContainer } from '../index';
import { useAppSelector } from '../../store/hooks/hooks';
import { getAccessToken } from '../../store/selectors/selectors';
import { ROUTES } from '../../const/routes';

export const PrivateLayout = () => {
	const accessToken = useAppSelector(getAccessToken);

	if (!accessToken) {
		return (
			<Navigate
				to={ROUTES.signIn}
				state={{
					from: location.pathname,
				}}
			/>
		);
	}

	return (
		<>
			<Header />
			<PageContainer>
				<Outlet />
			</PageContainer>
			<Footer />
		</>
	);
};
