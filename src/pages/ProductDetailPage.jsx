import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProductById } from '../js/app';

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function loadProduct() {
      const data = await fetchProductById(id);
      setProduct(data);
    }

    loadProduct();
  }, [id]);

  if (!product) {
    return null;
  }

  const handleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const exists = wishlist.some((item) => item.id === product.id);

    if (!exists) {
      wishlist.push(product);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      alert('Added to Wishlist ❤️');
    } else {
      alert('Already in Wishlist');
    }
  };

  return (
    <section id="product-details">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back to Products
      </button>
      <div className="product-detail-card">
        <div className="product-image">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="product-info">
          <h1>{product.title}</h1>
          <p className="category">{product.category}</p>
          <p className="price">${product.price}</p>
          <button className="wishlist-btn" onClick={handleWishlist}>
            ❤️ Add to Wishlist
          </button>
          <p className="description">{product.description}</p>
        </div>
      </div>
    </section>
  );
}

export default ProductDetailPage;
