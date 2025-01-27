// src/redux/bagSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ProductItem} from '../types';

interface BagItem extends ProductItem {
  quantity: number;
}

interface BagState {
  items: BagItem[];
}

const initialState: BagState = {
  items: [],
};

const bagSlice = createSlice({
  name: 'bag',
  initialState,
  reducers: {
    addToBag: (
      state,
      action: PayloadAction<{product: ProductItem; quantity: number}>,
    ) => {
      const {product, quantity} = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({...product, quantity});
      }
    },
    removeFromBag: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{id: string; quantity: number}>,
    ) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
  },
});

export const {addToBag, removeFromBag, updateQuantity} = bagSlice.actions;
export default bagSlice.reducer;
