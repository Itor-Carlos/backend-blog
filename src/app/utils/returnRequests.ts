import { Request, Response } from 'express';
import { ObjectRequest } from '../models/ObjectRequest';

export function sendErrorRequest(
  response: Response,
  statusCode: number,
  errors: ObjectRequest,
) {
  return response.status(statusCode).json(errors);
}
