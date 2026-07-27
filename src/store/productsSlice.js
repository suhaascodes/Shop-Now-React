import { createAction, createSlice } from '@reduxjs/toolkit';

export const fetchProductsStart = createAction('products/fetchStart');
export const fetchProductsSuccess = createAction('products/fetchSuccess');
export const fetchProductsFailed = createAction('products/fetchFailed');

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsStart, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsSuccess, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProductsFailed, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productsSlice.reducer;
