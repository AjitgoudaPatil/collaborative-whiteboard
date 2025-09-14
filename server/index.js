// const http = require('http');
// const { WebSocketServer } = require('ws');

// const server = http.createServer();
// const wss = new WebSocketServer({ server });

// const clients = new Set();

// wss.on('connection', (ws) => {
//   clients.add(ws);

//   ws.on('message', (message) => {
//     clients.forEach((client) => {
//       if (client !== ws && client.readyState === ws.OPEN) {
//         client.send(message);
//       }
//     });
//   });

//   ws.on('close', () => {
//     clients.delete(ws);
//   });

//   ws.on('error', (error) => {
//     console.error('WebSocket error:', error);
//     clients.delete(ws);
//   });
// });

// const PORT = process.env.PORT || 8080;
// server.listen(PORT, () => {
//   console.log(`Server is listening on port ${PORT}`);
// });
const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      server.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(data));
        }
      });
    } catch (err) {
      console.error('Error parsing message:', err);
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('Server is listening on port 8080');