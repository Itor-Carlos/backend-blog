import PostsRepository from '../repositories/PostsRepository';
import { sendErrorRequest } from '../utils/errorsRequest';
import { Request, Response } from 'express';
import UsersRepository from '../repositories/UsersRepository';

class PostController {
  async store(request: Request, response: Response) {
    const { titulo, conteudo, autor_id } = request.body;

    if (!titulo) {
      sendErrorRequest(response, 400, 'titulo');
    }
    if (!conteudo) {
      sendErrorRequest(response, 400, 'conteudo');
    }
    if (!autor_id) {
      sendErrorRequest(response, 400, 'autor_id');
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
}

export default new PostController();
