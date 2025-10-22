document.getElementById("pingBtn").addEventListener("click", async () => {
  const res = await fetch("http://127.0.0.1:8000/ping");
  const data = await res.json();
  document.getElementById("result").innerText = data.message;
});
const backendUrl = "http://127.0.0.1:8000";

// Register user
document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const shopType = document.getElementById("shopType").value;
  const email = document.getElementById("email").value;
  const location = document.getElementById("location").value;

  const params = new URLSearchParams({ name, shop_type: shopType, email, location });
  const res = await fetch(`${backendUrl}/users/register?${params}`, { method: "POST" });
  const data = await res.json();
  document.getElementById("apiResult").innerText = data.message;
});

// Add inventory
document.getElementById("inventoryForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const userId = document.getElementById("userId").value;
  const medicineName = document.getElementById("medicineName").value;
  const batchNo = document.getElementById("batchNo").value;
  const quantity = document.getElementById("quantity").value;
  const expiry = document.getElementById("expiry").value;

  const params = new URLSearchParams({ user_id: userId, medicine_name: medicineName, batch_no: batchNo, quantity, expiry_date: expiry });
  const res = await fetch(`${backendUrl}/inventory/add?${params}`, { method: "POST" });
  const data = await res.json();
  document.getElementById("apiResult").innerText = data.message;
});
