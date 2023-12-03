import React, { createContext, useContext } from 'react';

const defaultValue = {
	userId: '640cc43aaa397121838db691',
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
	const value: ContextType = {
		userId: defaultValue.userId,
	};

	return (
		<UserProfileContext.Provider value={value}>
			{props.children}
		</UserProfileContext.Provider>
	);
};
