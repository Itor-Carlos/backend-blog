import PostsRepository from '../repositories/PostsRepository';
import { sendMessageRequest } from '../utils/returnRequests';
import { Request, Response } from 'express';
import UsersRepository from '../repositories/UsersRepository';
import { ObjectRequest, emptyObjectRequest } from '../models/ObjectRequest';
import { PostBody } from '../models/Post';

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
      sendMessageRequest(response, 400, errors);
    }

    const autorExists = await UsersRepository.findById(autor_id);

    if (autorExists === undefined) {
      return sendMessageRequest(response, 400, {
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
        return sendMessageRequest(response, 400, {
          error: 'This Post do not exist',
        });
      }
      response.send(resultaQuery);
    } catch (error) {
      return sendMessageRequest(response, 400, {
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
      return sendMessageRequest(response, 404, {
        error: 'Used ID is not UUID type',
      });
    }
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { titulo, conteudo, autor_id } = request.body;

    const userAlredyExists = await PostsRepository.findById(id);

    if (!userAlredyExists) {
      return sendMessageRequest(response, 404, {
        error: 'Post not found',
      });
    }

    const postBody: PostBody = {
      titulo,
      conteudo,
      autor_id,
    };

    const resultQuery = await PostsRepository.update(id, postBody);
    return response.send(resultQuery);
  }
}

export default new PostController();
