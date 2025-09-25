const token = localStorage.getItem('token');

async function fetchProducts() {
  const res = await fetch('http://localhost:5000/api/products');
  const products = await res.json();
  const container = document.getElementById('product-list');
  container.innerHTML = '';

  products.forEach(p => {
    const div = document.createElement('div');
    div.className = 'product-card';
    div.innerHTML = `
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      <p>$${p.price}</p>
      <button onclick="addToCart('${p._id}')">Add to Cart</button>
    `;
    container.appendChild(div);
  });
}

async function addToCart(productId) {
  if (!token) return alert('Login first');
  await fetch('http://localhost:5000/api/cart/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ productId, quantity: 1 })
  });
  alert('Added to cart!');
}

fetchProducts();
