import { Request, Response } from 'express';
import UserRepository from '../repositories/UsersRepository';
import { sendMessageRequest } from '../utils/returnRequests';
import { ObjectRequest } from '../models/ObjectRequest';
import { emptyObjectRequest } from '../models/ObjectRequest';
import { UserBody } from '../models/User';
import { criptografar } from '../utils/criptografia';
import { HttpStatusCodes } from '../constants/HttpStatus';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserService from '../services/UserService';
import { generateToken } from '../utils/generateToken';
import { type } from 'os';

dotenv.config();

class UserController {
  async store(request: Request, response: Response) {
    const { nome, email, senha } = request.body;

    const errors: ObjectRequest = {};

    if (!nome) errors['nome'] = 'Nome is a required field';
    if (!email) errors['email'] = 'Email is a required field';
    if (!senha) errors['senha'] = 'Senha is a required field';

    if (!emptyObjectRequest(errors)) {
      return sendMessageRequest(response, HttpStatusCodes.BAD_REQUEST, errors);
    }

    const userAlredyExists = await UserRepository.findByEmail(email);

    if (userAlredyExists) {
      return sendMessageRequest(response, HttpStatusCodes.BAD_REQUEST, {
        error: 'This email has already been used',
      });
    }

    const resultRequest = await UserRepository.create(nome, email, senha);
    const token = generateToken(resultRequest.id);
    response.send({
      token: token,
      user: resultRequest,
    });
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;
    try {
      const resultRequest = await UserRepository.findById(id);

      if (!resultRequest) {
        return sendMessageRequest(response, HttpStatusCodes.NOT_FOUND, {
          message: 'User not found',
        });
      }

      response.send(resultRequest);
    } catch (error) {
      return sendMessageRequest(response, HttpStatusCodes.BAD_REQUEST, {
        error: 'Used ID is not UUID type',
      });
    }
  }

  async index(request: Request, response: Response) {
    const requestResult = await UserRepository.listAll();
    response.send(requestResult);
  }

  async remove(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const userAlredyExists = await UserRepository.findById(id);

      if (!userAlredyExists) {
        return sendMessageRequest(response, HttpStatusCodes.BAD_REQUEST, {
          error: 'User not found',
        });
      }
      UserRepository.delete(id);
      response.sendStatus(HttpStatusCodes.OK);
    } catch (error) {
      return sendMessageRequest(response, HttpStatusCodes.BAD_REQUEST, {
        error: 'Used ID is not UUID type',
      });
    }
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { nome, email, senha } = request.body;

    const userAlredyExists = await UserRepository.findById(id);

    if (!userAlredyExists) {
      return sendMessageRequest(response, HttpStatusCodes.NOT_FOUND, {
        error: 'User not found',
      });
    }

    const emailAlredyUsed = await UserRepository.findByEmail(email);

    if (emailAlredyUsed) {
      return sendMessageRequest(response, HttpStatusCodes.BAD_REQUEST, {
        error: 'Email alredy taken',
      });
    }
    const user: UserBody = {
      nome,
      email,
      senha: criptografar(senha),
    };

    const resultQuery = await UserRepository.update(id, user);
    return response.send(resultQuery);
  }

  async login(request: Request, response: Response) {
    const { email, senha } = request.body;

    const errors: ObjectRequest = {};

    if (!email) errors['email'] = 'Email is a required field';
    if (!senha) errors['senha'] = 'Senha is a required field';

    if (!emptyObjectRequest(errors)) {
      return sendMessageRequest(response, HttpStatusCodes.BAD_REQUEST, errors);
    }

    const user = await UserService.authenticateUser(email, senha);
    if (user) {
      const token = generateToken(user.id);
      return response.send({
        token: token,
      });
    }
    return response
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ message: 'Invalid credentials' });
  }
}

export default new UserController();
