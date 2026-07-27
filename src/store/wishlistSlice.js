import { createSlice } from '@reduxjs/toolkit';

const saved = JSON.parse(localStorage.getItem('wishlist')) || [];

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: saved,
  reducers: {
    add(state, action) {
      const exists = state.find((item) => item.id === action.payload.id);
      if (!exists) state.push(action.payload);
    },
    remove(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const { add, remove } = wishlistSlice.actions;
export default wishlistSlice.reducer;
