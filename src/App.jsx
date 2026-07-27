import { useEffect, useState } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setQuery, setSelectedCategory } from './store/uiSlice';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import WishlistPage from './pages/WishlistPage';
import ProfilePage from './pages/ProfilePage';
import { fetchCategories } from './js/app';
import {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from './store/categoriesSlice';

function App() {
  const location = useLocation();
  const query = useSelector((state) => state.ui.query);
  const selectedCategory = useSelector((state) => state.ui.selectedCategory);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.items);
  const categoriesLoading = useSelector((state) => state.categories.loading);

  useEffect(() => {
    async function loadCategories() {
      dispatch(fetchCategoriesStart());
      try {
        const data = await fetchCategories();
        dispatch(fetchCategoriesSuccess(data));
      } catch (error) {
        dispatch(fetchCategoriesFailed(error.toString()));
      }
    }

    loadCategories();
  }, [dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setQuery(event.target.search.value.trim()));
  };

  return (
    <>
      <header>
        <nav>
          <Link id="logo" to="/">
            Shop Now<span style={{ color: 'darkorange' }}>.</span>
          </Link>

          {location.pathname === '/' ? (
            <form id="search-form" onSubmit={handleSubmit}>
              <label htmlFor="search">
                <input
                  type="text"
                  name="search"
                  id="search"
                  placeholder="Search Products"
                  defaultValue={query}
                />
              </label>
              <select
                name="category"
                id="category"
                value={selectedCategory}
                onChange={(event) => dispatch(setSelectedCategory(event.target.value))}
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <input type="submit" value="Search" id="search-button" />
            </form>
          ) : (
            <div style={{ flex: 1 }} />
          )}

          <div id="nav-links">
            <Link id="cart" to="/wishlist">
              Wishlist
            </Link>
            <Link id="profile" to="/profile">
              Profile
            </Link>
          </div>
        </nav>
      </header>

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                query={query}
                selectedCategory={selectedCategory}
                categories={categories}
              />
            }
          />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
