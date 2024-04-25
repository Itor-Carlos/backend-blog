import { Request, Response } from 'express';

export function sendErrorRequest(
  response: Response,
  statusCode: number,
  field: string,
) {
  return response.status(statusCode).json({
    error: `${field} is a required field`,
  });
}
