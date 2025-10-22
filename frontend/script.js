document.getElementById("pingBtn").addEventListener("click", async () => {
  try {
    const res = await fetch("http://127.0.0.1:8000/ping");
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || "Ping failed");
    document.getElementById("result").innerText = data.message;
  } catch (err) {
    document.getElementById("result").innerText = "❌ " + err.message;
  }
});

const backendUrl = "http://127.0.0.1:8000";

// ======================
// Register user
// ======================
document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const shopType = document.getElementById("shopType").value;
  const email = document.getElementById("email").value;
  const location = document.getElementById("location").value;

  const params = new URLSearchParams({ name, shop_type: shopType, email, location });

  try {
    const res = await fetch(`${backendUrl}/users/register?${params}`, { method: "POST" });
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || "Registration failed");
    document.getElementById("apiResult").innerText = data.message;
  } catch (err) {
    document.getElementById("apiResult").innerText = "❌ " + err.message;
  }
});

// ======================
// Add inventory
// ======================
document.getElementById("inventoryForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const userId = document.getElementById("userId").value;
  const medicineName = document.getElementById("medicineName").value;
  const batchNo = document.getElementById("batchNo").value;
  const quantity = document.getElementById("quantity").value;
  const expiry = document.getElementById("expiry").value;

  const params = new URLSearchParams({
    user_id: userId,
    medicine_name: medicineName,
    batch_no: batchNo,
    quantity,
    expiry_date: expiry
  });

  try {
    const res = await fetch(`${backendUrl}/inventory/add?${params}`, { method: "POST" });
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || "Failed to add inventory");
    document.getElementById("apiResult").innerText = data.message;
  } catch (err) {
    document.getElementById("apiResult").innerText = "❌ " + err.message;
  }
});

// ======================
// Add blockchain transaction (QR generation)
// ======================
document.getElementById("blockForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const batch = document.getElementById("batch").value;
  const medName = document.getElementById("medName").value;
  const sender = document.getElementById("sender").value;
  const receiver = document.getElementById("receiver").value;

  const params = new URLSearchParams({ batch_no: batch, medicine_name: medName, sender, receiver });

  try {
    const res = await fetch(`${backendUrl}/blockchain/add_transaction?${params}`, { method: "POST" });
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || "Failed to add transaction");

    // ✅ Your 1st required addition: Clean QR generation
    const qrUrl = `http://127.0.0.1:8000/${data.qr_path}`;
    document.getElementById("qrDisplay").innerHTML = `
      <p>Transaction Hash: ${data.block_hash}</p>
      <img src="${qrUrl}" width="150">
    `;
  } catch (err) {
    document.getElementById("qrDisplay").innerHTML = `❌ ${err.message}`;
  }
});

// ======================
// Verify blockchain
// ======================
document.getElementById("verifyBtn").addEventListener("click", async () => {
  const batch = document.getElementById("verifyBatch").value;
  try {
    const res = await fetch(`${backendUrl}/blockchain/verify/${batch}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || "Verification failed");
    document.getElementById("verifyResult").innerText =
      data.valid ? "✅ Batch is valid and authenticated" : "❌ Batch not found or tampered";
  } catch (err) {
    document.getElementById("verifyResult").innerText = "❌ " + err.message;
  }
});

// ======================
// Load inventory
// ======================
document.getElementById("loadInventory").addEventListener("click", async () => {
  const userId = document.getElementById("dashboardUserId").value;
  try {
    const res = await fetch(`${backendUrl}/inventory/${userId}`);
    const inventory = await res.json();
    if (!res.ok) throw new Error(inventory.detail || "Failed to load inventory");

    const tbody = document.querySelector("#inventoryTable tbody");
    tbody.innerHTML = "";

    if (inventory.length === 0) {
      tbody.innerHTML = `<tr><td colspan="4">No inventory found</td></tr>`;
      return;
    }

    inventory.forEach(item => {
      const row = `<tr>
        <td>${item.medicine_name}</td>
        <td>${item.batch_no}</td>
        <td>${item.quantity}</td>
        <td>${item.expiry_date}</td>
      </tr>`;
      tbody.innerHTML += row;
    });
  } catch (err) {
    document.querySelector("#inventoryTable tbody").innerHTML = `
      <tr><td colspan="4">❌ ${err.message}</td></tr>
    `;
  }
});
