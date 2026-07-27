import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './uiSlice';
import wishlistReducer from './wishlistSlice';
import categoriesReducer from './categoriesSlice';
import productsReducer from './productsSlice';

const store = configureStore({
  reducer: {
    ui: uiReducer,
    wishlist: wishlistReducer,
    categories: categoriesReducer,
    products: productsReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  try {
    localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
  } catch (e) {
    // ignore write errors
  }
});

export default store;
