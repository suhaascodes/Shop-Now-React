import { useEffect, useState } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import WishlistPage from './pages/WishlistPage';
import ProfilePage from './pages/ProfilePage';
import { fetchCategories } from './js/app';

function App() {
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadCategories();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setQuery(event.target.search.value.trim());
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
                onChange={(event) => setSelectedCategory(event.target.value)}
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
