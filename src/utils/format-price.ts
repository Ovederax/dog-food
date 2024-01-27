const NSBP = ' ';

function splitNumber(num: number) {
	const value = Math.trunc(num);
	const lost = Math.round((num - value) * 100);
	const result = [];
	const digits = value.toString().split('').reverse();

	for (let i = 0; i < digits.length; i += 3) {
		result.push(
			digits
				.reverse()
				.slice(i, i + 3)
				.join('')
		);
	}

	const main = result.reverse().join(NSBP);

	return lost > 0 ? `${main}.${lost.toString().padEnd(2, '0')}` : main;
}

export const formatPrice = (value: number) => {
	return `${splitNumber(value)}${NSBP}₽`;
};
