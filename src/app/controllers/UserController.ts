import { Request, Response } from 'express';
import UserRepository from '../repositories/UsersRepository';
const bcrypt = require('bcryptjs');

class UserController {
  sendErrorRequest(response: Response, statusCode: number, field: string) {
    return response.sendStatus(statusCode).json({
      error: `${field} is a required field`,
    });
  }

  async store(request: Request, response: Response) {
    const { nome, email, senha } = request.body;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(senha, salt);

    console.log(hash);

    if (!nome) {
      this.sendErrorRequest(response, 400, 'nome');
    }

    if (!email) {
      this.sendErrorRequest(response, 400, 'email');
    }

    if (!senha) {
      this.sendErrorRequest(response, 400, 'senha');
    }

    const resultRequest = await UserRepository.create(nome, email, senha);
    response.send(resultRequest);
  }
}

export default new UserController();
