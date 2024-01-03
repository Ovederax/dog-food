import './style.css';
import {
	RouterProvider,
	createBrowserRouter,
	Navigate,
} from 'react-router-dom';
import { Layout } from './ui';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme/theme';
import {
	Favorites,
	Catalog,
	ItemPage,
	Profile,
	NotFoundPage,
	ROUTES,
} from './routes';
import { UserProfileProvider } from './providers/user-provider';
import { store } from './store/store';
import { Provider } from 'react-redux';
import EditProfilePage from './routes/profile/edit-profile-page';
import AddReview from './routes/review/add-review';

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
				path: ROUTES.productAddReview,
				element: <AddReview />,
			},
			{
				path: ROUTES.profile,
				element: <Profile />,
			},
			{
				path: ROUTES.editProfile,
				element: <EditProfilePage />,
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
		<Provider store={store}>
			<UserProfileProvider>
				<ThemeProvider theme={theme}>
					<RouterProvider router={router} />
				</ThemeProvider>
			</UserProfileProvider>
		</Provider>
	);
};
