import { User } from './User';

export type Post = {
  id: string;
  titulo: string;
  conteudo: string;
  autor_id: string;
  autor: User;
  data_criacao?: Date;
};

export type PostBody = Omit<Post, 'id' | 'autor' | 'data_criacao'>;
