export type User = {
  id: string;
  nome: string;
  email: string;
  senha: string;
  data_criacao: Date;
};

export type UserBody = Omit<User, 'id' | 'data_criacao'>;
