import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export function generateToken(userId: string) {
  const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRATION_TIME!,
  });
  return token;
}
