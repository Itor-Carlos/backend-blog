import query from '../database';

class PostsRepository {
  async create(titulo: string, conteudo: string, autor_id: string) {
    const [row] = await query(
      'INSERT INTO posts (titulo, conteudo, autor_id) VALUES ($1,$2,$3) RETURNING id, titulo, conteudo, data_criacao',
      [titulo, conteudo, autor_id],
    );
    return row;
  }

  async listAll() {
    const row = await query('SELECT id, titulo, conteudo FROM posts', []);
    return row;
  }
}

export default new PostsRepository();
