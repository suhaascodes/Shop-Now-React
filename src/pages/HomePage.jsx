import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProducts, fetchProductsByCategory } from '../js/app';

const productsPerPage = 10;

function HomePage({ query, selectedCategory }) {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([]);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        let products;

        if (selectedCategory === 'all') {
          products = await fetchProducts();
        } else {
          products = await fetchProductsByCategory(selectedCategory);
        }

        setAllProducts(products);
        setCurrentProducts(products);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [selectedCategory]);

  useEffect(() => {
    setCurrentPage(1);
  }, [query, selectedCategory]);

  const filteredProducts = useMemo(() => {
    const searchTerm = query.toLowerCase();
    return currentProducts.filter((product) =>
      product.title.toLowerCase().includes(searchTerm)
    );
  }, [currentProducts, query]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const renderPagination = () => {
    const buttons = [];

    for (let i = 1; i <= totalPages; i += 1) {
      buttons.push(
        <button
          key={i}
          className={i === currentPage ? 'active-page' : ''}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  if (loading) {
    return (
      <section id="products">
        {Array.from({ length: 10 }).map((_, index) => (
          <div className="skeleton-card" key={index}>
            <div className="skeleton-image" />
            <div className="skeleton-title" />
            <div className="skeleton-category" />
            <div className="skeleton-price" />
            <div className="skeleton-button" />
          </div>
        ))}
      </section>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <section id="products">
        <div className="no-products">
          <h3>No products found 😔</h3>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="products">
        {paginatedProducts.map((product) => (
          <div className="card" key={product.id}>
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p className="category">{product.category}</p>
            <p className="price">${product.price}</p>
            <button
              className="details-btn"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              View Details
            </button>
          </div>
        ))}
      </section>

      <div id="pagination">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage((page) => page - 1)}>
          ← Prev
        </button>
        {renderPagination()}
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((page) => page + 1)}>
          Next →
        </button>
      </div>
    </>
  );
}

export default HomePage;
