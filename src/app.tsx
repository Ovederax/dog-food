import './style.css';
import {
	RouterProvider,
	createBrowserRouter,
	Navigate,
} from 'react-router-dom';
import { Layout } from './ui';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme/theme';
import { DataProvider } from './providers/data-provider';
import {
	Favorites,
	Catalog,
	ItemPage,
	Profile,
	NotFoundPage,
	ROUTES,
} from './routes';
import { UserProfileProvider } from './providers/user-provider';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '/',
				element: <Navigate to={ROUTES.catalog} replace />,
			},
			{
				path: ROUTES.catalog,
				element: <Catalog />,
			},
			{
				path: ROUTES.card,
				element: <ItemPage />,
			},
			{
				path: ROUTES.profile,
				element: <Profile />,
			},
			{
				path: ROUTES.favorites,
				element: <Favorites />,
			},
			{
				path: '*',
				element: <NotFoundPage />,
			},
		],
	},
]);

export const App = () => {
	return (
		<UserProfileProvider>
			<DataProvider>
				<ThemeProvider theme={theme}>
					<RouterProvider router={router} />
				</ThemeProvider>
			</DataProvider>
		</UserProfileProvider>
	);
};
