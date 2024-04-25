import query from '../database';

class PostsRepository {
  async create(titulo: string, conteudo: string, autor_id: string) {
    const [row] = await query(
      'INSERTO INTO posts (titulo, conteudo, autor_id) VALUES ($1,$2,$3) RETURING id, titulo, conteudo, data_criacao',
      [titulo, conteudo, autor_id],
    );
    return row;
  }
}

export default new PostsRepository();
