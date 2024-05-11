import { Request, Response } from 'express';
import UserRepository from '../repositories/UsersRepository';
import { sendMessageRequest } from '../utils/returnRequests';
import { ObjectRequest } from '../models/ObjectRequest';
import { emptyObjectRequest } from '../models/ObjectRequest';

class UserController {
  async store(request: Request, response: Response) {
    const { nome, email, senha } = request.body;

    const errors: ObjectRequest = {};

    if (!nome) errors['nome'] = 'Nome is a required field';
    if (!email) errors['email'] = 'Email is a required field';
    if (!senha) errors['senha'] = 'Senha is a required field';

    if (!emptyObjectRequest(errors)) {
      return sendMessageRequest(response, 400, errors);
    }

    const userAlredyExists = await UserRepository.findByEmail(email);

    if (userAlredyExists) {
      sendMessageRequest(response, 400, {
        error: 'This email has already been used',
      });
    }

    const resultRequest = await UserRepository.create(nome, email, senha);
    response.send(resultRequest);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;
    try {
      const resultRequest = await UserRepository.findById(id);

      if (!resultRequest) {
        sendMessageRequest(response, 400, {
          message: 'User not found',
        });
      }

      response.send(resultRequest);
    } catch (error) {
      sendMessageRequest(response, 400, {
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
        sendMessageRequest(response, 404, {
          error: 'User not found',
        });
      }
      UserRepository.delete(id);
      response.sendStatus(200);
    } catch (error) {
      sendMessageRequest(response, 400, {
        error: 'Used ID is not UUID type',
      });
    }
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { nome, email, senha } = request.body;

    const userAlredyExists = await UserRepository.findById(id);

    if (!userAlredyExists) {
      sendMessageRequest(response, 404, {
        error: 'User not found',
      });
    }

    const emailAlredyUsed = await UserRepository.findByEmail(email);
    console.log(emailAlredyUsed);

    if (emailAlredyUsed) {
      sendMessageRequest(response, 404, {
        error: 'Email alredy taken',
      });
    }

    const resultQuery = await UserRepository.update(id, nome, email, senha);
    return response.send(resultQuery);
  }
}

export default new UserController();
