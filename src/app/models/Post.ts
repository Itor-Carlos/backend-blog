import { User } from './User';

export type Post = {
  id: string;
  titulo: string;
  conteudo: string;
  autor_id: string;
  autor: User;
  data_criacao?: Date;
};
