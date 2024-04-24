import query from '../database/index';

class UserRepository {
  async create(nome: string, email: string, senha: string) {
    const [row] = await query(
      `INSERT INTO users (nome, email, senha)
    VALUES ($1, $2, $3)
    RETURNING id,nome,email
    `,
      [nome, email, senha],
    );
    return row;
  }

  async findById(id: string) {
    const [row] = await query(
      'SELECT nome, email, data_criacao FROM Users WHERE id = $1',
      [id],
    );
    return row;
  }

  async listAll() {
    const row = await query('SELECT id,nome,email FROM Users;', []);
    return row;
  }

  async findByEmail(email: string) {
    const [row] = await query(
      'SELECT id, nome, email FROM Users WHERE email = $1',
      [email],
    );
    return row;
  }

  async delete(id: string) {
    await query('DELETE FROM Users WHERE id = $1', [id]);
  }

  async update(id: string, name: string, email: string, senha: string) {
    const updates = [];
    const values = [];

    if (name !== undefined) {
      updates.push('nome = $1');
      values.push(name);
    }

    if (email !== undefined) {
      updates.push('email = $2');
      values.push(email);
    }

    if (senha !== undefined) {
      updates.push('senha = $3');
      values.push(senha);
    }

    values.push(id);
    const updateString = updates.join(', ');

    const queryUpdate = `UPDATE Users SET ${updateString} WHERE id = $${values.length} RETURNING id, nome, email`;

    const [row] = await query(queryUpdate, values);
    return row;
  }
}

export default new UserRepository();
