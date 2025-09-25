const API_URL = "http://localhost:5000/api/auth";

// REGISTER
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
      });

      const data = await res.json();
      document.getElementById("registerMsg").innerText =
        res.ok ? "✅ Registered successfully!" : `❌ ${data.message}`;
    } catch (err) {
      document.getElementById("registerMsg").innerText = "❌ Error registering";
    }
  });
}

// LOGIN
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (res.ok) {
        document.getElementById("loginMsg").innerText = "✅ Logged in!";
        localStorage.setItem("token", data.token); // save JWT
      } else {
        document.getElementById("loginMsg").innerText = `❌ ${data.message}`;
      }
    } catch (err) {
      document.getElementById("loginMsg").innerText = "❌ Error logging in";
    }
  });
}
