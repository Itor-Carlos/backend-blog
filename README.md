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
* 7°) Rode o comando `psql -U root` para logar no postgres
* 8°) Copie todo o conteúdo do arquivo schema.sql dentro de src/app/database
* 9°) Vá no arquivo index.ts no caminho src/app/database
* 10°) Altere as informações de host, port, user, password (caso tenha feito passo o passo 3 exatamente como foi dito, esse passo atual pode ser ignorado)
* 11°) Rode o comando:
  - ```
     yarn start
    ```

### Próximas etapas:
* [ ] Facilitar o start do projeto pela primeira vez.
* [ ] Adicionar testes unitários
* [ ] Mehorar retorno de erros
