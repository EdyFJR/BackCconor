import jwt, { Secret } from 'jsonwebtoken';

const key = process.env.JWT

export function generateToken(userId: string): string {
  return jwt.sign({ userId }, process.env.JWT as Secret, {
    expiresIn: '1h', // Tiempo de expiración del token (ejemplo: 1 hora)
  });
}

export function validateToken(token: string): boolean {
  try {
    jwt.verify(token, process.env.JWT as Secret);
    return true;
  } catch (error) {
    return false;
  }
}
