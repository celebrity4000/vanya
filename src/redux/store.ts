import {configureStore} from '@reduxjs/toolkit';
import favoritesReducer from './favoritesSlice';
import productsReducer from './productsSlice';
import bagReducer from './bagSlice';

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    products: productsReducer,
    bag: bagReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
