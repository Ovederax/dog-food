import './style.css';
import {
	createBrowserRouter,
	Navigate,
	RouterProvider,
} from 'react-router-dom';
import { PrivateLayout } from './ui';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme/theme';
import {
	Catalog,
	Favorites,
	ItemPage,
	NotFoundPage,
	Profile,
	ROUTES,
	SignUp,
} from './routes';
import { persistor, store } from './store/store';
import { Provider } from 'react-redux';
import EditProfilePage from './routes/profile/edit-profile-page';
import AddReview from './routes/review/add-review';
import { SignLayout } from './ui/layout/sign-layout';
import { SignIn } from './routes/sign/sign-in';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Basket } from './routes/basket/basket';
import { PersistGate } from 'redux-persist/integration/react';

const signRoutes = [
	{
		path: ROUTES.signUp,
		element: (
			<SignLayout>
				<SignUp />
			</SignLayout>
		),
	},
	{
		path: ROUTES.signIn,
		element: (
			<SignLayout>
				<SignIn />
			</SignLayout>
		),
	},
];

const catalogRoutes = {
	path: '/',
	element: <PrivateLayout />,
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
			path: ROUTES.basket,
			element: <Basket />,
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
};

const router = createBrowserRouter([
	{
		path: '/',
		children: [...signRoutes, catalogRoutes],
	},
]);

export const App = () => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<ThemeProvider theme={theme}>
					<RouterProvider router={router} />
				</ThemeProvider>
				<ToastContainer
					position='top-right'
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme='light'
				/>
			</PersistGate>
		</Provider>
	);
};
