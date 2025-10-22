document.getElementById("checkHistoryBtn").addEventListener("click", async () => {
  const batchNo = document.getElementById("batchHistoryInput").value;
  const res = await fetch(`${backendUrl}/blockchain/verify/${batchNo}`);
  const data = await res.json();
  const display = document.getElementById("historyDisplay");
  
  if (!data.valid) {
    display.innerHTML = "<p>❌ Batch not found or tampered!</p>";
    return;
  }

  let html = `<p>✅ Batch is valid</p>`;
  html += `<h3>Transaction History:</h3><ul>`;
  data.history.forEach(tx => {
    html += `<li>Sender: ${tx.data.sender}, Receiver: ${tx.data.receiver}, Timestamp: ${new Date(tx.data.timestamp*1000).toLocaleString()}</li>`;
  });
  html += "</ul>";
  display.innerHTML = html;
});
