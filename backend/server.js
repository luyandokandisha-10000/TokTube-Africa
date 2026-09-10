// backend/server.js
require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Mock function to simulate payment processing
function processPayment({ provider, amount, creator, message }) {
  // In a real implementation you would call the provider's SDK/API here.
  // This mock simply returns a success response with a fake transaction ID.
  const transactionId = `tx_${Date.now()}`;
  return { status: 'success', transactionId, provider, amount, creator };
}

app.post('/api/tip', (req, res) => {
  const { provider, amount, creator, message } = req.body;
  if (!provider || !amount || !creator) {
    return res.status(400).json({ status: 'error', message: 'Missing required fields' });
  }
  try {
    const result = processPayment({ provider, amount, creator, message });
    res.json(result);
  } catch (e) {
    console.error('Payment error', e);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Tip API server listening on http://localhost:${port}`);
});
