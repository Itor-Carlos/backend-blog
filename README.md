# Blog's API

* Repositório criado para estudo da linguagem TypeScript de uma forma mais prática

* Tecnologias usadas: Node, TypeScript, Postgres, Express

* Esse projeto tem como intuito simular o backend de uma aplicação de um blog onde podem ser cadastrados Usuários e Posts.

### Avisos:
 * É necessário ter instalado o Node.js e o Docker para conseguir rodar essa aplicação

### Etapas para rodar a aplicação:
* 1°) Clone o projeto utilizando o comando:
  - ```sh
     git clone https://github.com/Itor-Carlos/desafio-blog.git
    ```
* 2°) Rode o comando:
  - ```
     cd desafio-blog
    ```
* 3°) Utilize o comando:
  - ```
     yarn
    ```
* 4°) Com o docker já instalado rode o comando seguinte para criar um container Postgres (caso já tenha feito isso anteriormente, esse passo pode ser ignorado):
  - ```
     docker-compose up -d
    ```
* 5°) Rode o container anteriormente criado
* 6°) Execute o seguinte comando no terminal:.
  - ```
     docker exec -it pg bash
    ```
  - Sendo que o "pg" seria o nome do container anteriormente criado
* 7°) Rode o comando:
  - ```
      psql -U root
    ```
  - O comando acima irá logar no postgres com o usuário "root"
* 8°) Rode o comando abaixo:
  - ```
      CREATE DATABASE Challenge;
    ```
* 9°) Rode o comando abaixo:
  - ```
      \c challenge
    ```
* 10°) Rode o código SQL abaixo no terminal:
  - ```
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
      CREATE TABLE Users (
          id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
          nome VARCHAR(50) NOT NULL,
          email VARCHAR(100) UNIQUE NOT NULL,
          senha VARCHAR(100) NOT NULL,
          data_criacao TIMESTAMP WITH TIME ZONE DEFAULT timezone('America/Sao_Paulo'::TEXT, CURRENT_TIMESTAMP),
          ativo BOOLEAN DEFAULT true
      );
      CREATE TABLE Posts (
          id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
          titulo VARCHAR(100) NOT NULL,
          conteudo TEXT NOT NULL,
          autor_id UUID NOT NULL,
          data_criacao TIMESTAMP WITH TIME ZONE DEFAULT timezone('America/Sao_Paulo'::TEXT, CURRENT_TIMESTAMP),
          FOREIGN KEY (autor_id) REFERENCES Users(id)
      );
    ```
* 11°) Rode o comando:
  - ```
     yarn start
    ```

### Próximas etapas:
* [ ] Facilitar o start do projeto pela primeira vez.
* [ ] Adicionar testes unitários
* [ ] Melhorar retorno de erros
* [ ] Colocar para ser selecionado qual tipo de BD na inicialização
