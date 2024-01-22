import { FC, useLayoutEffect, useRef } from 'react';
import { Alert, Stack } from '@mui/material';
import { Spinner } from './spinner';

interface LoadMoreProps {
	action: () => void;
	isLoading?: boolean;
	isEndOfList?: boolean;
}
export const LoadMore: FC<LoadMoreProps> = ({
	action,
	isLoading,
	isEndOfList,
}) => {
	const ref = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		let observer: IntersectionObserver | undefined = undefined;
		if (!isEndOfList) {
			const options: IntersectionObserverInit = {
				threshold: 0.25,
			};

			const callback: IntersectionObserverCallback = (entries) => {
				if (entries[0].isIntersecting && !isLoading) {
					action();
				}
			};

			observer = new IntersectionObserver(callback, options);
			ref.current && observer.observe(ref.current);
		}

		return () => {
			observer && observer.disconnect();
		};
	}, [action, isEndOfList, isLoading]);

	return (
		<Stack
			ref={ref}
			direction='row'
			justifyContent='center'
			alignItems='center'
			sx={{ minHeight: 80 }}>
			{isLoading && <Spinner />}
			{isEndOfList && <Alert severity='success'>End of list!</Alert>}
		</Stack>
	);
};
