import './style.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Catalog } from './routes/catalog';
import { Layout } from './ui';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme/theme';
import { DataProvider } from './_data/data-provider';

const routes = {
	catalog: '/',
};

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: routes.catalog,
				element: <Catalog />,
			},
		],
	},
]);

export const App = () => {
	return (
		<DataProvider>
			<ThemeProvider theme={theme}>
				<RouterProvider router={router} />
			</ThemeProvider>
		</DataProvider>
	);
};
