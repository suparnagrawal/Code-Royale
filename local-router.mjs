import http from 'http';
import httpProxy from 'http-proxy';

const proxy = httpProxy.createProxyServer({
  ws: true,
});

proxy.on('error', (err, req, res) => {
  console.error("Proxy error:", err.message);
  if (res.writeHead) {
    res.writeHead(502, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: "Local service is offline or unreachable." }));
  }
});

const server = http.createServer((req, res) => {
  console.log(`[ROUTER] Incoming HTTP request: ${req.method} ${req.url}`);
  // Route Judge0 execution requests to the Docker container
  if (req.url.startsWith('/submissions') || req.url.startsWith('/about')) {
    proxy.web(req, res, { target: 'http://127.0.0.1:2358' });
  } 
  // Route everything else to the Socket.io server
  else {
    proxy.web(req, res, { target: 'http://127.0.0.1:3001' });
  }
});

// Handle WebSocket upgrades for Socket.io
server.on('upgrade', (req, socket, head) => {
  console.log(`[ROUTER] Incoming WebSocket Upgrade: ${req.url}`);
  proxy.ws(req, socket, head, { target: 'http://127.0.0.1:3001' });
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`\n=========================================`);
  console.log(`🚦 Local Router running on port ${PORT}`);
  console.log(`=========================================`);
  console.log(`-> /submissions routes to Execution Sandbox (Port 2358)`);
  console.log(`-> WebSockets route to Socket Server (Port 3001)\n`);
  console.log(`To expose both online, run: ./ngrok http ${PORT}\n`);
});
