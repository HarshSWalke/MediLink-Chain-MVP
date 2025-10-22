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

document.getElementById("blockForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const batch = document.getElementById("batch").value;
  const medName = document.getElementById("medName").value;
  const sender = document.getElementById("sender").value;
  const receiver = document.getElementById("receiver").value;

  const params = new URLSearchParams({ batch_no: batch, medicine_name: medName, sender, receiver });
  const res = await fetch(`${backendUrl}/blockchain/add_transaction?${params}`, { method: "POST" });
  const data = await res.json();
  document.getElementById("qrDisplay").innerHTML = `
    <p>Transaction Hash: ${data.block_hash}</p>
    <img src="http://127.0.0.1:8000/${data.qr_path}" width="150">
  `;
});

document.getElementById("verifyBtn").addEventListener("click", async () => {
  const batch = document.getElementById("verifyBatch").value;
  const res = await fetch(`${backendUrl}/blockchain/verify/${batch}`);
  const data = await res.json();
  document.getElementById("verifyResult").innerText =
    data.valid ? "✅ Batch is valid and authenticated" : "❌ Batch not found or tampered";
});

