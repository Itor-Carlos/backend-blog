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

  async findById(id: string) {
    const [row] = await query(
      'SELECT id, titulo, conteudo FROM posts WHERE id = $1',
      [id],
    );
    return row;
  }

  async remove(id: string) {
    return await query('DELETE FROM Posts WHERE id = $1', [id]);
  }

  async update(id: string, titulo: string, conteudo: string, autor_id: string) {
    const updates = [];
    const values = [];

    if (titulo !== undefined) {
      updates.push('titulo = $1');
      values.push(titulo);
    }

    if (conteudo !== undefined) {
      updates.push('conteudo = $2');
      values.push(conteudo);
    }

    if (autor_id !== undefined) {
      updates.push('autor_id = $3');
      values.push(autor_id);
    }

    values.push(id);
    const updateString = updates.join(', ');

    const queryUpdate = `UPDATE Posts SET ${updateString} WHERE id = $${values.length} RETURNING id, titulo, conteudo, autor_id`;

    const [row] = await query(queryUpdate, values);
    return row;
  }
}

export default new PostsRepository();
