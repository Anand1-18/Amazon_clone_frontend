const token = localStorage.getItem('token');

async function fetchCart() {
  const res = await fetch('http://localhost:5000/api/cart', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const cart = await res.json();
  const container = document.getElementById('cart-list');
  container.innerHTML = '';
  let total = 0;

  cart.items.forEach(i => {
    const div = document.createElement('div');
    div.innerHTML = `${i.product.name} - $${i.product.price} x ${i.quantity}`;
    container.appendChild(div);
    total += i.product.price * i.quantity;
  });
  document.getElementById('total').innerText = total.toFixed(2);
}

document.getElementById('checkoutBtn').addEventListener('click', async () => {
  const res = await fetch('http://localhost:5000/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ items: [], totalAmount: 0, shippingAddress: "123 Street" })
  });
  const data = await res.json();
  alert('Order placed!');
});

fetchCart();
