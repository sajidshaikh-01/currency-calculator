const { test, describe, after } = require('node:test');
const assert = require('node:assert/strict');

const { createApp, parseAmount } = require('../index');

describe('parseAmount', () => {
  test('returns null for invalid values', () => {
    assert.equal(parseAmount(''), null);
    assert.equal(parseAmount('0'), null);
    assert.equal(parseAmount('-2'), null);
    assert.equal(parseAmount('abc'), null);
  });

  test('returns numeric values for valid input', () => {
    assert.equal(parseAmount('1.25'), 1.25);
    assert.equal(parseAmount(3), 3);
  });
});

describe('health endpoint', () => {
  const app = createApp();
  const server = app.listen(0);

  after(() => {
    server.close();
  });

  test('responds with OK', async () => {
    const { port } = server.address();
    const response = await fetch(`http://127.0.0.1:${port}/healthz`);
    const body = await response.text();

    assert.equal(response.status, 200);
    assert.equal(body, 'OK');
  });
});
