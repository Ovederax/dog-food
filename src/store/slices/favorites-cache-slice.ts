import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const sliceName = 'products';

export interface FavoriteProductCache {
	productId: string;
	inFav: boolean;
}

interface State {
	favorites: FavoriteProductCache[];
}

const initialState: State = {
	favorites: [],
};

const findItemByProductId = (
	favorites: FavoriteProductCache[],
	productId: string
): FavoriteProductCache | undefined => {
	return favorites.find((it) => it.productId === productId);
};

export const favoritesCacheSlice = createSlice({
	name: sliceName,
	initialState,
	reducers: {
		addToFavorites: (state, action: PayloadAction<string>) => {
			const productId = action.payload;
			const item = findItemByProductId(state.favorites, productId);

			if (item) {
				item.inFav = true;
			} else {
				state.favorites.push({
					productId,
					inFav: true,
				});
			}
		},
		removeFromFavorite: (state, action) => {
			const productId = action.payload;
			const item = findItemByProductId(state.favorites, productId);

			if (item) {
				item.inFav = false;
			} else {
				state.favorites.push({
					productId,
					inFav: false,
				});
			}
		},
	},
});

export const { addToFavorites, removeFromFavorite } =
	favoritesCacheSlice.actions;
