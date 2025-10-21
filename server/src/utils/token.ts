import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET ?? 'secret';

export interface JwtPayload {
  sub: string;
  familyId: string;
  role: string;
}

export const signToken = (payload: JwtPayload) => {
  return jwt.sign(payload, secret, { expiresIn: '12h' });
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};
