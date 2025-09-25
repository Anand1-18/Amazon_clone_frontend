const token = localStorage.getItem('token');

async function fetchOrders() {
  const res = await fetch('http://localhost:5000/api/orders', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const orders = await res.json();
  const container = document.getElementById('orders-list');
  container.innerHTML = '';

  orders.forEach(o => {
    const div = document.createElement('div');
    div.innerHTML = `<strong>Order:</strong> ${o._id} - Total: $${o.totalAmount}`;
    container.appendChild(div);
  });
}

fetchOrders();
