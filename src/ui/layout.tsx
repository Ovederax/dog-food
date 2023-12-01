import { Header, Footer } from '../components';
import { Outlet } from 'react-router-dom';
import { PageContainer } from '../ui';

export const Layout = () => {
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
