import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/token';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    familyId: string;
    role: string;
  };
}

export const requireAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Необходима авторизация' });
  }
  try {
    const token = header.replace('Bearer ', '');
    const payload = verifyToken(token);
    req.user = { id: payload.sub, familyId: payload.familyId, role: payload.role };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Недействительный токен' });
  }
};
