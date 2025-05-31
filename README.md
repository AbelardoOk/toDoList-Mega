# 📝 ToDoList - Desafio Mega

## 📌 Visão Geral

Este projeto é um sistema completo de gerenciamento de tarefas com autenticação de usuários. Ele permite que os usuários:
- Criem, visualizem, atualizem e excluam tarefas pessoais.
- Atribuam diferentes níveis de prioridade às tarefas.
- Gerenciem suas tarefas de forma eficiente e organizada.

> **Nota:** As rotas da API estão documentadas e disponíveis em [http://127.0.0.1:3000/api-docs](http://127.0.0.1:3000/api-docs).

## 🔗 Link do Projeto

[MegaJr - Frontend](https://github.com/Joao-Gabriel-Salomao/MegaJr) <br>
[MegaJr - Backend](https://github.com/AbelardoOk/toDoList-Mega)

---
# 🛠️ Tecnologias Utilizadas

- **Backend:** Node.js, Express.js
- **Banco de Dados:** PostgreSQL
- **Autenticação:** JWT (JSON Web Tokens)
- **Documentação da API:** Swagger

---
# 🧾 Estrutura do Banco de Dados

## Tabela: `usuarios`

```sql
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    token_jwt TEXT
);
```

## Tipo Enumerado: `prioridade_enum`

```sql
CREATE TYPE prioridade_enum AS ENUM ('alta', 'media', 'baixa');
```

## Tabela: `tarefas`

```sql
CREATE TABLE tarefas (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    data_hora TIMESTAMP NOT NULL,
    prioridade prioridade_enum NOT NULL DEFAULT 'media',
    usuario_id INTEGER REFERENCES usuarios(id)
);
```

---
## 🚀 Como Executar o Projeto

1. **Clone o repositório:**
    ```bash
    git clone https://github.com/AbelardoOk/toDoList-Mega.git
    ```

2. **Acesse o diretório do projeto:**
    ```bash
    cd toDoList-Mega
    ```

3. **Instale as dependências:**
    ```bash
    npm install
    ```

4. **Configure as variáveis de ambiente:**
	Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
    ```env
    PG_USER=seu usuario do postgres
    PG_PASSWORD=sua senha
    JWT_SECRET=senha do jwt
    ```

5. **Execute as migrações do banco de dados:**
    Certifique-se de que o banco de dados está configurado conforme as instruções acima.

6. **Inicie o servidor:**
    ```bash
    npm start
    ```

7. **Acesse a documentação da API:**
    Abra o navegador e vá para [http://127.0.0.1:3000/api-docs](http://127.0.0.1:3000/api-docs) para visualizar a documentação interativa da API.


---
# 📂 Estrutura do Projeto
```
toDoList-Mega/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── docs/
│   ├── interface/
│   ├── middlewares/
│   ├── routes/
│   ├── services/
│   └── server.ts
├── .env
├── package.json
├── tsconfig.json
└── README.md
```

---
# 🔐 Autenticação

A autenticação é realizada utilizando JSON Web Tokens (JWT). Após o login, o token JWT é retornado e deve ser incluído no cabeçalho das requisições subsequentes:

```
Authorization: Bearer <seu_token_jwt>
```

---
# 📄 Documentação das Rotas
A documentação completa das rotas da API está disponível via Swagger em:

👉 [http://127.0.0.1:3000/api-docs](http://127.0.0.1:3000/api-docs)

---
# 📸 Interface do Usuário

> **Nota:** Este repositório contém apenas o backend da aplicação. O frontend está disponível em um repositório separado: [MegaJr - Frontend](https://github.com/Joao-Gabriel-Salomao/MegaJr).

---
# 👥 Responsáveis pelo Projeto

- João Gabriel Salomão - [@Joao-Gabriel-Salomao](https://github.com/Joao-Gabriel-Salomao)
- Vitor Alex Valenzuela - [@Vitor-Valenzuela](https://github.com/Vitor-Valenzuela)
- Abelardo Palácios Ribeiro - [@AbelardoOk](https://github.com/AbelardoOk)
- João Leonardo Macanhão - [@João-Macanhão]()

---

