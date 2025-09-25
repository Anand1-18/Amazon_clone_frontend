const API_URL = "http://localhost:5000/api";

// Load products
async function loadProducts() {
  const res = await fetch(`${API_URL}/products`);
  const products = await res.json();

  const container = document.getElementById("products");
  container.innerHTML = "";

  products.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}" width="150">
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      <p><b>$${p.price}</b></p>
      <button onclick="addToCart('${p._id}')">Add to Cart</button>
    `;
    container.appendChild(div);
  });
}

// Add to cart
async function addToCart(productId) {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please login first!");
    window.location.href = "login.html";
    return;
  }

  const res = await fetch(`${API_URL}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ productId, quantity: 1 })
  });

  const data = await res.json();
  alert("✅ Added to cart!");
}

window.onload = loadProducts;

