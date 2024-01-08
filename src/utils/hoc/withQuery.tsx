import { ComponentType } from 'react';
import Container from '@mui/material/Container';
import { Button, Spinner } from '../../ui';
import { Alert, AlertTitle } from '@mui/material';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

interface WithQueryProps {
	isLoading: boolean;
	isError: boolean;
	refetch: () => void;
	error?: FetchBaseQueryError | SerializedError;
}

export const QueryComponent = (props: WithQueryProps) => {
	const { isError, isLoading, refetch, error } = props;

	if (isError) {
		return (
			<Container maxWidth='sm'>
				<Alert action={<Button onClick={refetch}>Refetch</Button>}>
					<>
						<AlertTitle>Error</AlertTitle>
						{error ?? 'Unknown error. Please resend request'}
					</>
				</Alert>
			</Container>
		);
	}

	if (isLoading) {
		return <Spinner />;
	}

	return null;
};

export const withQuery = <P extends object>(
	WrappedComponent: ComponentType<P>
) => {
	const Component = (props: WithQueryProps & P) => {
		const { isError, isLoading, refetch, error, ...rest } = props;

		if (isError || isLoading) {
			return (
				<QueryComponent
					isLoading={isLoading}
					isError={isError}
					refetch={refetch}
					error={error}
				/>
			);
		}

		return <WrappedComponent {...(rest as P)} />;
	};

	Component.displayName = `withQuery(${WrappedComponent.displayName})`;

	return Component;
};
