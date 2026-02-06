const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
const API_URL = process.env.EXCHANGE_API_URL || 'https://api.exchangerate.host/convert';

const apiClient = axios.create({
  timeout: 8000,
});

const parseAmount = (value) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return null;
  }
  return parsed;
};

app.get('/api/convert', async (req, res) => {
  const { from, to, amount } = req.query;
  const numericAmount = parseAmount(amount);

  if (!from || !to || !numericAmount) {
    return res.status(400).json({
      error: 'Please provide from, to and a positive amount query params',
    });
  }

  try {
    const r = await apiClient.get(API_URL, {
      params: { from, to, amount: numericAmount },
    });
    return res.json(r.data);
  } catch (err) {
    const status = err.response?.status || 502;
    console.error(err?.message || err);
    return res.status(status).json({
      error: 'Conversion failed',
      detail: err.message || err,
    });
  }
});

app.get('/healthz', (req, res) => res.send('OK'));

app.listen(PORT, () => console.log(`Backend listening on ${PORT}`));
