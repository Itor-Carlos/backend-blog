import { User } from '../models/User';
import UsersRepository from '../repositories/UsersRepository';
import { criptografar } from '../utils/criptografia';

class UserService {
  async authenticateUser(email: string, senha: string) {
    const users = await UsersRepository.listAll();
    const user = users.find((u: User) => u.email === email);
    if (user && user.senha === criptografar(senha)) {
      return user;
    }
    return null;
  }
}

export default new UserService();
