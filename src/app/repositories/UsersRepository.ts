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
}

export default new UserRepository();
