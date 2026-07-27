import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    query: '',
    selectedCategory: 'all',
  },
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
    },
  },
});

export const { setQuery, setSelectedCategory } = uiSlice.actions;
export default uiSlice.reducer;
