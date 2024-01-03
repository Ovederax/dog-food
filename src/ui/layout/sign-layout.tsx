import { Header, Footer } from '../../components';
import { PageContainer } from '../index';
import React from 'react';

interface Props {
	children: React.ReactNode;
}

export const SignLayout = (props: Props) => {
	const { children } = props;

	return (
		<>
			<Header />
			<PageContainer>{children}</PageContainer>
			<Footer />
		</>
	);
};
