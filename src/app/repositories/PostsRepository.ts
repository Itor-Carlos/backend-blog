import query from '../database';
import { PostBody } from '../models/Post';

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

  async update(id: string, postBody: PostBody) {
    const updates: string[] = [];
    const values: string[] = [];
    const columnsReturn: string[] = [];
    let contador = 0;

    const entries = Object.entries(postBody);

    entries.forEach(([key, value]) => {
      if (value !== undefined) {
        updates.push(`${key} = $${contador + 1}`);
        values.push(value);
        columnsReturn.push(key);
        contador++;
      }
    });

    values.push(id);
    const updateString = updates.join(', ');

    const queryUpdate = `UPDATE Posts SET ${updateString} WHERE id = $${values.length} RETURNING id, ${columnsReturn.join(', ')}`;

    const [row] = await query(queryUpdate, values);
    return row;
  }
}

export default new PostsRepository();
