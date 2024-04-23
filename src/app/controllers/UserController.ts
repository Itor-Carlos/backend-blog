import { Request, Response } from 'express';
import UserRepository from '../repositories/UsersRepository';
import { criptografar } from '../utils/criptografia';

class UserController {
  sendErrorRequest(response: Response, statusCode: number, field: string) {
    return response.sendStatus(statusCode).json({
      error: `${field} is a required field`,
    });
  }

  async store(request: Request, response: Response) {
    const { nome, email, senha } = request.body;

    if (!nome) {
      this.sendErrorRequest(response, 400, 'nome');
    }

    if (!email) {
      this.sendErrorRequest(response, 400, 'email');
    }

    if (!senha) {
      this.sendErrorRequest(response, 400, 'senha');
    }

    const resultRequest = await UserRepository.create(
      nome,
      email,
      criptografar(senha),
    );
    response.send(resultRequest);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;
    try {
      const resultRequest = await UserRepository.findById(id);

      if (!resultRequest) {
        response.status(400).json({
          message: 'User not found',
        });
      }

      response.send(resultRequest);
    } catch (error) {
      response.status(400).json({
        error: 'Used ID is not UUID type',
      });
    }
  }

  async index(request: Request, response: Response) {
    const requestResult = await UserRepository.listAll();
    response.send(requestResult);
  }
}

export default new UserController();
