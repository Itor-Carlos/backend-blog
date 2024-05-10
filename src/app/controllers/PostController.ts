import PostsRepository from '../repositories/PostsRepository';
import { sendErrorRequest } from '../utils/errorsRequest';
import { Request, Response } from 'express';
import UsersRepository from '../repositories/UsersRepository';
import { ObjectRequest, emptyObjectRequest } from '../models/ObjectRequest';

class PostController {
  async store(request: Request, response: Response) {
    const { titulo, conteudo, autor_id } = request.body;

    const errors: ObjectRequest = {};

    if (!titulo) {
      errors['titulo'] = 'Titulo is a required field';
    }
    if (!conteudo) {
      errors['conteudo'] = 'Conteudo is a required field';
    }
    if (!autor_id) {
      errors['autor_id'] = 'Autor_id is a required field';
    }

    if (!emptyObjectRequest(errors)) {
      return response.status(400).json(errors);
    }

    const autorExists = await UsersRepository.findById(autor_id);

    if (autorExists === undefined) {
      return response.status(404).json({
        error: 'This autor do not exist',
      });
    }

    const postCreated = await PostsRepository.create(
      titulo,
      conteudo,
      autor_id,
    );
    return response.status(200).json(postCreated);
  }

  async index(request: Request, response: Response) {
    const returnSelect = await PostsRepository.listAll();
    return response.status(200).json(returnSelect);
  }

  async show(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const resultaQuery = await PostsRepository.findById(id);

      if (!resultaQuery) {
        return response.status(400).json({
          error: 'This Post do not exist',
        });
      }
      response.send(resultaQuery);
    } catch (error) {
      response.status(400).json({
        error: 'Used ID is not UUID type',
      });
    }
  }

  async remove(request: Request, response: Response) {
    try {
      const { id } = request.params;
      await PostsRepository.remove(id);
      response.send(200);
    } catch (error) {
      response.status(400).json({
        error: 'Used ID is not UUID type',
      });
    }
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { titulo, conteudo, autor_id } = request.body;

    const userAlredyExists = await PostsRepository.findById(id);

    if (!userAlredyExists) {
      return response.status(404).json({
        error: 'Post not found',
      });
    }

    const resultQuery = await PostsRepository.update(
      id,
      titulo,
      conteudo,
      autor_id,
    );
    return response.send(resultQuery);
  }
}

export default new PostController();
