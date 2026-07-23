import { WebSocketServer } from 'ws';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from "@repo/backend-common/config";

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws, request) => {
  const url = request.url;
  if (!url) {
    return;
  }

  const queryParams = new URLSearchParams(url.split('?')[1]);
  const token = queryParams.get('token');
  if (!token) {
    ws.close(1008, 'Token is required');
    return;
  }

  const decoded = jwt.verify(token, JWT_SECRET);
  if (!decoded || typeof decoded === 'string') {
    ws.close(1008, 'Invalid token');
    return;
  }

  if (!decoded.userId) {
    ws.close(1008, 'Invalid token payload');
    return;
  }

  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
    ws.send(`Hi From ws-server`);
  });

  ws.on('error', (error) => {
    console.error(`WebSocket error: ${error}`);
  });

  ws.on('close', () => {
    console.log('WebSocket connection closed');
  });
});