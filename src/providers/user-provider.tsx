import React, { createContext, useContext, useLayoutEffect } from 'react';
import { useActions, useAppSelector } from '../store/hooks/hooks';
import { getUser } from '../store/selectors/selectors';
import { Spinner } from '../ui';

const defaultValue = {
	userId: '',
};

type ContextType = {
	userId: string;
};

const UserProfileContext = createContext<ContextType>(defaultValue);

export const useUserProfileContext = () => useContext(UserProfileContext);

interface Props {
	children: React.ReactNode;
}

export const UserProfileProvider = (props: Props) => {
	const { loading, error, userData } = useAppSelector(getUser);
	const { fetchMe } = useActions();

	useLayoutEffect(() => {
		fetchMe();
	}, [fetchMe]);

	if (loading || (!userData && !error)) {
		return <Spinner />;
	}

	if (error || !userData) {
		return <>Error</>;
	}

	const value: ContextType = {
		userId: userData._id,
	};

	return (
		<UserProfileContext.Provider value={value}>
			{props.children}
		</UserProfileContext.Provider>
	);
};
