import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface ProductItem {
  id: string;
  name: string;
  price: string;
  image: any;
  rating: number;
  reviews: number;
  isNew?: boolean;
  category?: string;
  color?: string;
  size?: string;
  inStock?: boolean;
}

interface FavoritesState {
  items: ProductItem[];
}

const initialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<ProductItem>) => {
      const index = state.items.findIndex(
        item => item.id === action.payload.id,
      );
      if (index === -1) {
        state.items.push(action.payload);
      } else {
        state.items.splice(index, 1);
      }
    },
  },
});

export const {toggleFavorite} = favoritesSlice.actions;
export default favoritesSlice.reducer;
