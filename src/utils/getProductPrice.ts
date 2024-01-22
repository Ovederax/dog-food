export const getProductPrice = (price: number, discount: number) => {
	const oldPrice = price + (price * discount) / 100;

	return { oldPrice, newPrice: price };
};
