// src/redux/productsSlice.ts
import {createSlice} from '@reduxjs/toolkit';
import {ProductItem} from '../types';
import {
  aataProducts,
  daalProducts,
  gheeAndOilProducts,
  spicesProducts,
  essentialProducts,
} from '../constants/products';

interface ProductsState {
  items: ProductItem[];
}

const initialState: ProductsState = {
  items: [
    ...aataProducts,
    ...daalProducts,
    ...gheeAndOilProducts,
    ...spicesProducts,
    ...essentialProducts,
  ],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
});

export default productsSlice.reducer;
