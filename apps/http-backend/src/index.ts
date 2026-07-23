import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { CreateUserSchema, SignInSchema } from '@repo/common/types';
import { JWT_SECRET } from "@repo/backend-common/config";
import { authenticateToken } from './middleware';

const app = express();

app.post('/signup', (req: Request, res: Response) => {

  const data = CreateUserSchema.safeParse(req.body);
  if (!data.success) {
    return res.status(400).json({ error: "Invalid user data" });
  }

  const token = jwt.sign({ username: data.data.username }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

app.post('/signin', (req: Request, res: Response) => {
  const data = SignInSchema.safeParse(req.body);
  if (!data.success) {
    return res.status(400).json({ error: "Invalid sign-in data" });
  }

  // validation logic for user credentials

  const token = jwt.sign({ username: data.data.username }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

app.post('/create-room', authenticateToken, (req: Request, res: Response) => {
  const { roomName } = req.body;
  // logic to create room

  res.json({ message: 'Room created successfully', roomName });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});