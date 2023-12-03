export const ROUTES = {
	home: '/',
	favorites: '/favorites',
	basket: '/basket',
	catalog: '/items',
	card: '/items/:id',
	profile: '/profile',
};

export const getURLForCard = (id: string) => {
	return ROUTES.card.replace(':id', id);
};
