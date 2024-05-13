import query from '../database/index';
import { User, UserBody } from '../models/User';
import { criptografar } from '../utils/criptografia';

class UserRepository {
  async create(nome: string, email: string, senha: string) {
    const [row] = await query(
      `INSERT INTO users (nome, email, senha)
    VALUES ($1, $2, $3)
    RETURNING id,nome,email
    `,
      [nome, email, criptografar(senha)],
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

  async update(id: string, user: UserBody) {
    const updates: string[] = [];
    const values: string[] = [];
    const returnList: string[] = [];

    let contador = 0;

    const keys = Object.entries(user);
    keys.forEach((key) => {
      if (key[1] !== undefined) {
        updates.push(`${key[0]} = $${contador + 1}`);
        values.push(key[1]);
        returnList.push(key[0]);
        contador++;
      }
    });

    values.push(id);
    const updateString = updates.join(', ');
    const colunmsReturn = returnList.join(', ');

    const queryUpdate = `UPDATE Users SET ${updateString} WHERE id = $${values.length} RETURNING id,${colunmsReturn}`;

    const [row] = await query(queryUpdate, values);
    return row;
  }
}

export default new UserRepository();
