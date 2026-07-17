import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function WishlistPage() {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(savedWishlist);
  }, []);

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter((product) => product.id !== id);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    setWishlist(updatedWishlist);
  };

  return (
    <section id="wishlist-section">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back to Products
      </button>
      <h1>My Wishlist</h1>
      <section id="wishlist-products">
        {wishlist.length === 0 ? (
          <div className="empty-wishlist">
            <h2>❤️ Your wishlist is empty</h2>
            <p>Browse products and add your favorites.</p>
            <a href="/" className="browse-btn">
              Browse Products
            </a>
          </div>
        ) : (
          wishlist.map((product) => (
            <div className="card" key={product.id}>
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p className="price">${product.price}</p>
              <button className="remove-btn" onClick={() => removeFromWishlist(product.id)}>
                Remove
              </button>
            </div>
          ))
        )}
      </section>
    </section>
  );
}

export default WishlistPage;
