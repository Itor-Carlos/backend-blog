import { User } from './User';

export type Post = {
  id: string;
  titulo: string;
  conteudo: string;
  autor_id: User;
  data_criacao?: Date;
};
