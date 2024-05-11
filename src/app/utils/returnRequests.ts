import { Request, Response } from 'express';
import { ObjectRequest } from '../models/ObjectRequest';

export function sendMessageRequest(
  response: Response,
  statusCode: number,
  messages: ObjectRequest | Object,
) {
  return response.status(statusCode).json(messages);
}
