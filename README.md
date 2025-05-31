# ToDoList - Desafio Mega

## Visão Geral
Este projeto implementa um sistema de gerenciamento de tarefas com autenticação de usuários. A aplicação permite criar, visualizar, atualizar e excluir tarefas pessoais com diferentes níveis de prioridade.

## Banco de Dados
Para utilizar o projeto, é necessário criar duas tabelas no seu banco de dados de preferência. O exemplo abaixo utiliza PostgreSQL.

### Tabela de Usuários
```sql
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    token_jwt TEXT
);
```

### Tabela de Tarefas
```sql
CREATE TYPE prioridade_enum AS ENUM ('alta', 'media', 'baixa')

CREATE TABLE tarefas (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    data_hora TIMESTAMP NOT NULL,
    prioridade prioridade_enum NOT NULL DEFAULT 'media',
    concluida BOOLEAN NOT NULL DEFAULT FALSE,
    data_conclusao TIMESTAMP,
    usuario_id INT REFERENCES usuarios(id)
);

CREATE INDEX idx_tarefa_prioridade ON tarefas(prioridade)
```

## Configuração do Ambiente

### Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto com as seguintes configurações:

```
PG_USER=seu_usuario
PG_PASSWORD=sua_senha
JWT_SECRET=sua_chave_secreta
```

### Conexão com o Banco de Dados
O arquivo `db.ts` contém a configuração de conexão com o banco de dados:

```typescript
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST || 'localhost',
  port: parseInt(process.env.PG_PORT || '5432'),
  database: process.env.PG_DATABASE
});

export default pool;
```

## Instalação e Execução

1. Clone o repositório
2. Instale as dependências:
   ```
   npm install
   ```
3. Configure o arquivo `.env` conforme instruções acima
4. Execute as queries SQL para criar as tabelas no seu banco de dados
5. Inicie o servidor:
   ```
   npm run dev
   ```
