import http from 'http';
import { WebSocketServer } from 'ws';
import app from './app.js';
import StockFeed from './services/stockFeed.js';
import detectAnomaly from './services/anomalyDetector.js';
import config from './config/stockConfig.json' assert { type: 'json' };

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const symbols = Object.keys(config);
const feed = new StockFeed(symbols);

const clients = new Set();

// WebSocket connection handler
wss.on('connection', (ws) => {
  clients.add(ws);
  console.log(' WebSocket client connected');

  ws.on('close', () => {
    clients.delete(ws);
    console.log(' WebSocket client disconnected');
  });
});

// Emit price updates + detect anomalies + broadcast
feed.on('priceUpdate', (update) => {
  detectAnomaly(update);

  const message = JSON.stringify(update);
  for (const client of clients) {
    if (client.readyState === 1) {
      client.send(message);
    }
  }
});

server.listen(PORT, () => {
  console.log(` HTTP & WebSocket server running on port ${PORT}`);
});
