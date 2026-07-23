import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "@repo/backend-common/config";


export const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token is required' });
  }

  const decoded = jwt.verify(token, JWT_SECRET);
  if (!decoded || typeof decoded === 'string') {
      return res.status(403).json({ error: 'Invalid token payload' });
    }

    req.userId = decoded.userId;
    next();
};
