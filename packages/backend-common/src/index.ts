import { env } from 'process';

export const JWT_SECRET = env.JWT_SECRET || 'default_secret';