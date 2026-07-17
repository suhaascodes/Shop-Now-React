export async function fetchProducts() {
  const response = await fetch('https://fakestoreapi.com/products');
  return response.json();
}

export async function fetchCategories() {
  const response = await fetch('https://fakestoreapi.com/products/categories');
  return response.json();
}

export async function fetchProductsByCategory(category) {
  const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
  return response.json();
}

export async function fetchProductById(id) {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  return response.json();
}
