import { useEffect, useRef, useState } from 'react';

interface Props<ValueType> {
	value: ValueType;
	delay: number;
}

export const useThrottle = <ValueType = unknown>({
	value,
	delay,
}: Props<ValueType>): [ValueType, boolean] => {
	const [throttledValue, setThrottledValue] = useState(value);

	const ref = useRef({
		value,
		inProgress: false,
	});

	useEffect(() => {
		ref.current.value = value;

		if (ref.current.inProgress) return;

		ref.current.inProgress = true;

		setTimeout(() => {
			setThrottledValue(ref.current.value);
			ref.current.inProgress = false;
		}, delay);
	}, [delay, value]);

	return [throttledValue, value !== throttledValue];
};
