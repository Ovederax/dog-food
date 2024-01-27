import { BasketItem } from '../store/slices/basket-slice';

export const countProductsInBasket = (items: BasketItem[]) => {
	return items.reduce((prev, it) => prev + it.count, 0);
};
