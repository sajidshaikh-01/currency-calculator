const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/convert', async (req, res) => {
  const { from, to, amount } = req.query;
  if (!from || !to || !amount) {
    return res.status(400).json({ error: "Please provide from, to and amount query params" });
  }
  try {
    const r = await axios.get('https://api.exchangerate.host/convert', {
      params: { from, to, amount }
    });
    return res.json(r.data);
  } catch (err) {
    console.error(err?.message || err);
    return res.status(500).json({ error: "Conversion failed", detail: err.message || err });
  }
});

app.get('/healthz', (req, res) => res.send('OK'));

app.listen(PORT, () => console.log(`Backend listening on ${PORT}`));
