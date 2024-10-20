
# Lumi Server

O Lumi Server é responsável por processar as faturas de energia elétrica e extrair os dados relevantes. Ele organiza esses dados em um banco de dados PostgreSQL e fornece uma API para que o Lumi Client possa consumir e exibir as informações de forma estruturada.


## Rodando localmente

#### Pré-requisitos

Antes de iniciar o Lumi Server, certifique-se de ter instalado em seu ambiente:

- **Node.js** (versão 14 ou superior)
- **npm** (gerenciador de pacotes do Node.js) ou **yarn**
- **PostgreSQL** (banco de dados relacional)

#### Clone o projeto

```bash
  git clone https://github.com/matthmarinho/lumi-server.git
```

#### Entre no diretório do projeto

```bash
  cd lumi-server
```

#### Instale as dependências

```bash
  npm install
```

#### Configure o Banco de Dados PostgreSQL:

```bash
CREATE DATABASE database_name;
```

#### Configuração do Prisma:

Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis de ambiente:

```bash
postgresql://user:password@host:port/database_name?schema=SCHEMA
```

Substitua user, password, host, port (geralmente 5432 para o PostgreSQL) e DATABASE pelas configurações do seu banco de dados.

#### Executar as Migrações:

```bash
npx prisma migrate dev
```

#### Inicie o servidor

```bash
  npm run dev
```


## Stack utilizada

Node.js, Prisma, PostgreSQL



## Documentação da API

#### Base Url

```http
  https://lumi-server.fly.dev/api
```

#### Inserir PDF de Fatura

```http
  POST /api/upload-pdf
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `file` | `File` | Arquivo PDF da fatura de energia |

#### Retorna dados do Dashboard

```http
  GET /api/dashboard
```

#### Retorna dados da Biblioteca de Faturas

```http
  GET /api/library
```