export const ROUTES = {
	home: '/',
	favorites: '/favorites',
	basket: '/basket',
	catalog: '/items',
	card: '/items/:id',
	productAddReview: '/items/:productId/add-review',
	profile: '/profile',
	editProfile: '/edit-profile',
};

export const getURLForCard = (id: string) => {
	return ROUTES.card.replace(':id', id);
};

export const getURLForProductAddReview = (id: string) => {
	return ROUTES.productAddReview.replace(':productId', id);
};
