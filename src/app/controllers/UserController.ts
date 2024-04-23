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
}

export default new UserController();
