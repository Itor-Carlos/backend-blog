import query from '../database/index';

class UserRepository {
  async create(nome: string, email: string, senha: string) {
    const [row] = await query(
      `INSERT INTO users (nome, email, senha)
    VALUES ($1, $2, $3)
    RETURNING nome,email,senha
    `,
      [nome, email, senha],
    );
    return row;
  }
}

export default new UserRepository();
