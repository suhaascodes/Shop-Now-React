import { createAction, createSlice } from '@reduxjs/toolkit';

export const fetchCategoriesStart = createAction('categories/fetchStart');
export const fetchCategoriesSuccess = createAction('categories/fetchSuccess');
export const fetchCategoriesFailed = createAction('categories/fetchFailed');

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoriesStart, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoriesSuccess, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCategoriesFailed, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categoriesSlice.reducer;
